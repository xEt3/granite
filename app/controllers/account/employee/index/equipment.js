import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { singularize } from 'ember-inflector';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend(ajaxStatus, addEdit, {
  auth: service(),
  ajax: service(),

  newAssetItem:    null,
  suggestedDocs:   A(),
  fileAssignments: A(),

  async getSuggestedDocs (assetItem, employee) {
    let assetDocs = (await assetItem.get('asset.documents')).toArray();
    let assetItemDocs = (await assetItem.get('documents')).toArray();
    let combinedDocs = A([ ...assetItemDocs, ...assetDocs ]).uniq().toArray();

    let idsAssigned = (await this.ajax.request('/api/v1/file-assignments', {
      data: {
        employee: employee.get('id'),
        file:     { $in: combinedDocs.map(({ id }) => id) },
        select:   'file'
      }
    })).fileAssignment;

    return combinedDocs.filter(doc => !idsAssigned.find(({ file }) => file === doc.get('id')));
  },

  actions: {
    createAsset (category) {
      let user = this.get('auth.user');

      this.set('pendingAssetItem', this.store.createRecord('asset-item', {
        asset:      category,
        identifier: this.get('employee.firstName') + '\'s ' + singularize(category.get('name')),
        creator:    user,
        company:    user.get('company')
      }));

      $('.new-asset').modal('show');
    },

    saveAsset () {
      this.ajaxStart();

      this.pendingAssetItem.save()
      .then(asset => {
        this.send('selectAsset', asset);
      })
      .catch(this.ajaxError.bind(this));
    },

    abortAsset () {
      let asset = this.pendingAssetItem;

      asset.destroyRecord()
      .then(() => {
        this.set('pendingAssetItem', null);
      });
    },

    selectAsset (asset) {
      this.model.addObject(asset);
      this.ajaxStart();

      let user = this.get('auth.user'),
          employee = this.employee;

      if (asset.get('assignments').findBy('employee.id', employee.get('id'))) {
        this.ajaxSuccess(null, true);
        return;
      }

      let assignment = this.store.createRecord('asset-assignment', {
        employee,
        assigner: user
      });

      asset.get('assignments').addObject(assignment);

      asset.save()
      .then(assetItem => {
        // remove ghost assignment
        assetItem.assignments.forEach(a => {
          if (!a.id) {
            assetItem.assignments.removeObject(a);
          }
        });

        this.set('newAssetItem', assetItem);
        this.getSuggestedDocs(assetItem, employee)
        .then(suggestedDocs => {
          if (suggestedDocs.length) {
            this.send('openAssignmentModal', suggestedDocs, employee);
          }
        });

        this.send('refresh');
        this.ajaxSuccess(null, true);
      })
      .catch(this.ajaxError.bind(this));
    },

    unassignAsset (asset) {
      this.model.removeObject(asset);

      let assignment = asset.get('assignments').findBy('employee.id', this.get('employee.id'));

      if (assignment) {
        this.ajaxStart();
        asset.get('assignments').removeObject(assignment);
        asset.save()
        .then(() => {
          this.ajaxSuccess(null, true);
          this.send('refresh');
        })
        .catch(this.ajaxError.bind(this));
      }
    },

    newAssetCategory () {
      this.send('refresh');
    },

    openAssignmentModal (suggestedDocs, employee) {
      this.setProperties({
        suggestedDocs,
        employee
      });

      $('.asset-documents').modal({
        detachable: true,
        closable:   false,
        onHidden:   () => {
          this.setProperties({
            suggestedDocs:   A(),
            fileAssignments: A(),
            newAssetItem:    null
          });
        }
      }).modal('show');
    },

    closeAssignmentModal () {
      $('.asset-documents').modal('hide');
    },

    createAssignment (file) {
      let newAssignment = this.store.createRecord('file-assignment', {
        file,
        employee:          this.employee,
        visibleToEmployee: true
      });
      this.fileAssignments.addObject(newAssignment);
      this.suggestedDocs.removeObject(file);
    },

    saveAssignments () {
      this.fileAssignments.forEach(fa => {
        this.saveModel(fa);
      });
      this.send('closeAssignmentModal');
    },

    cancelAssignments () {
      this.send('closeAssignmentModal');
    },

    updateAssignment (fileAssignment) {
      this.fileAssignments.addObject(fileAssignment);
    },

    removeAssignment (fileAssignment) {
      this.fileAssignments.removeObject(fileAssignment);
      this.suggestedDocs.addObject(fileAssignment.file);
    }
  }
});
