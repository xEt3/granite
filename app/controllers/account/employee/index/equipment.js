import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';
import { singularize } from 'ember-inflector';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend(ajaxStatus, {
  auth: service(),

  newAssetItem:  null,
  suggestedDocs: [],

  async getSuggestedDocs (assetItem, employee) {
    this.set('suggestedDocs', []);
    let assetDocs = (await assetItem.get('asset.documents')).toArray();
    let assetItemDocs = (await assetItem.get('documents')).toArray();
    let alreadyAssignedDocs = (await this.store.query('fileAssignment', { employee: employee.id })).toArray();
    //USE THIS SOMEHOW

    this.set('suggestedDocs', assetDocs);
    assetItemDocs.forEach(doc => {
      if (!this.get('suggestedDocs').includes(doc)) {
        this.get('suggestedDocs').push(doc);
      }
    });
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

      this.get('pendingAssetItem').save()
      .then(asset => {
        this.send('selectAsset', asset);
      })
      .catch(this.ajaxError.bind(this));
    },

    abortAsset () {
      let asset = this.get('pendingAssetItem');

      asset.destroyRecord()
      .then(() => {
        this.set('pendingAssetItem', null);
      });
    },

    selectAsset (asset) {
      this.get('model').addObject(asset);//adds so its instant on UI
      this.ajaxStart();

      let user = this.get('auth.user'),
          employee = this.get('employee');

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
        //remove ghost assignment
        assetItem.assignments.forEach(a => {
          if (!a.id) {
            assetItem.assignments.removeObject(a);
          }
        });

        this.set('newAssetItem', assetItem);//for modal display usage
        this.getSuggestedDocs(assetItem, employee)
        .then(() => {
          if (this.get('suggestedDocs').length) {
            $('.asset-documents').modal('show');
          }
        });

        this.send('refresh');
        this.ajaxSuccess(null, true);
      })
      .catch(this.ajaxError.bind(this));
    },

    unassignAsset (asset) {
      this.get('model').removeObject(asset);

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

    assignDocs () {
      console.log('inside assignDocs');
    },

    abortDocs () {
      console.log('inside abortDocs');
    }
  }
});
