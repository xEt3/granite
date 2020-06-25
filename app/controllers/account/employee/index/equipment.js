import Controller from 'granite/core/controller';
import { singularize } from 'ember-inflector';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default class AccountEmployeeEquipmentController extends Controller {
  @service auth
  @service ajax
  @service data

  @tracked newAssetItem = null
  @tracked pendingAssetItem = null

  suggestedDocs =   A()
  fileAssignments = A()

  async getSuggestedDocs (assetItem, employee) {
    let assetDocs = (await assetItem.get('asset.documents')).toArray();
    let assetItemDocs = (await assetItem.get('documents')).toArray();
    let combinedDocs = A([ ...assetItemDocs, ...assetDocs ]).uniq().toArray();

    let idsAssigned = (await this.ajax.request('/api/v1/file-assignments', {
      data: {
        employee: employee.id,
        file:     { $in: combinedDocs.map(({ id }) => id) },
        select:   'file'
      }
    })).fileAssignment;

    return combinedDocs.filter(doc => !idsAssigned.find(({ file }) => file === doc.id));
  }

  @action
  async createAsset (category) {
    let user = this.auth.get('user');

    this.pendingAssetItem = await this.store.createRecord('asset-item', {
      asset:      category,
      identifier: this.employee.firstName + '\'s ' + singularize(category.name),
      creator:    user,
      company:    user.get('company')
    });

    $('.new-asset').modal('show');
  }

  @action
  async saveAsset () {
    let { success, error } = this.data.createStatus();

    try {
      let asset = await this.pendingAssetItem.save();
      this.selectAsset(asset);
      success(null, true);
    } catch (e) {
      error(e);
    }
  }

  @action
  async abortAsset () {
    let asset = this.pendingAssetItem;

    await asset.destroyRecord();
    this.pendingAssetItem = null;
  }

  @action
  async selectAsset (asset) {
    this.model.addObject(asset);
    let { success, error } = this.data.createStatus();

    let user = this.auth.get('user'),
        employee = this.employee;

    if (asset.assignments.findBy('employee.id', employee.id)) {
      success(null, true);
      return;
    }

    let assignment = await this.store.createRecord('asset-assignment', {
      employee,
      assigner: user
    });

    asset.assignments.addObject(assignment);

    try {
      let assetItem = await asset.save();
      // remove ghost assignment
      assetItem.assignments.forEach(a => {
        if (!a.id) {
          assetItem.assignments.removeObject(a);
        }
      });

      this.newAssetItem = assetItem;

      let suggestedDocs = await this.getSuggestedDocs(assetItem, employee);
      if (suggestedDocs.length) {
        this.openAssignmentModal(suggestedDocs, employee);
      }

      this.send('refreshModel');
      success(null, true);
    } catch (e) {
      error(e);
    }
  }

  @action
  async unassignAsset (asset) {
    this.model.removeObject(asset);

    let assignment = asset.assignments.findBy('employee.id', this.employee.id);

    if (assignment) {
      let { success, error } = this.data.createStatus();
      try {
        asset.assignments.removeObject(assignment);
        await asset.save();
        success(null, true);
        this.send('refreshModel');
      } catch (e) {
        error(e);
      }
    }
  }

  @action
  newAssetCategory () {
    this.send('refreshModel');
  }

  @action
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
  }

  @action
  closeAssignmentModal () {
    $('.asset-documents').modal('hide');
  }

  @action
  createAssignment (file) {
    let newAssignment = this.store.createRecord('file-assignment', {
      file,
      employee:          this.employee,
      visibleToEmployee: true
    });
    this.fileAssignments.addObject(newAssignment);
    this.suggestedDocs.removeObject(file);
  }

  @action
  saveAssignments () {
    this.fileAssignments.forEach(fa => {
      this.data.saveRecord(fa);
    });
    this.closeAssignmentModal();
  }

  @action
  cancelAssignments () {
    this.closeAssignmentModal();
  }

  @action
  updateAssignment (fileAssignment) {
    this.fileAssignments.addObject(fileAssignment);
  }

  @action
  removeAssignment (fileAssignment) {
    this.fileAssignments.removeObject(fileAssignment);
    this.suggestedDocs.addObject(fileAssignment.file);
  }
}
