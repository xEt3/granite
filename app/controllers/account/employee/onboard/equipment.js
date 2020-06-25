import Controller from 'granite/core/controller';
import Object from '@ember/object';
import { get, action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { singularize } from 'ember-inflector';
import { tracked } from '@glimmer/tracking';
import $ from 'jquery';

export default class AccountEmployeeOnboardEquipmentController extends Controller {
  @service auth
  @service data
  @tracked pendingAssetItem
  @tracked assignedAssets
  @tracked assignableAssets

  get groupedAssignedAssets () {
    let assignedAssets = this.assignedAssets,
        groups = A();

    let findGroup = asset => groups.findBy('asset.id', get(asset, 'id'));

    assignedAssets.forEach(stock => {
      let asset = stock.asset,
          existingGroup = findGroup(asset);

      if (!existingGroup) {
        groups.addObject(Object.create({
          asset,
          assets: A()
        }));

        existingGroup = findGroup(asset);
      }

      existingGroup.assets.addObject(stock);
    });

    return groups;
  }

  get splitAssets () {
    let jobSuggestedAssets = this.jobSuggestedAssets,
        assignableAssets = this.assignableAssets,
        suggestedAssets = A(),
        remainingAssets = A();

    assignableAssets.forEach(asset => {
      if (jobSuggestedAssets.includes(asset.asset)) {
        suggestedAssets.push(asset);
      } else {
        remainingAssets.push(asset);
      }
    });

    return {
      suggestedAssets,
      remainingAssets
    };
  }

  @action
  async createAsset (category) {
    let user = await this.auth.get('user');

    this.pendingAssetItem = await this.store.createRecord('asset-item', {
      asset:      category,
      identifier: this.model.firstName + '\'s ' + singularize(category.name),
      creator:    user,
      company:    user.company
    });

    $('#modal__new-asset').modal({
      onHidden: () => {
        if (!this || this.isDestroyed || this.isDestroying) {
          $('#modal__new-asset').remove();
        }

        $('#modal__new-asset').appendTo($('#modal__new-asset--placeholder'));
      }
    }).modal('show');
  }

  @action
  async saveAsset () {
    let { success, error } = this.data.createStatus();

    try {
      let asset = await this.pendingAssetItem.save();
      success(null, true);
      await this.selectAsset(asset);
      $('#modal__new-asset').modal('hide');
    } catch (e) {
      error(e);
    }
  }

  @action
  async abortAsset () {
    let asset = this.pendingAssetItem;

    await asset.destroyRecord();
    this.pendingAssetItem = null;
    $('#modal__new-asset').modal('hide');
  }

  @action
  async selectAsset (asset) {
    let { success, error } = this.data.createStatus();

    let user = await this.auth.get('user'),
        employee = this.model;

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
      assetItem.assignments.filterBy('id', null).invoke('destroyRecord');
      this.assignedAssets.addObject(assetItem);
      success(null, true);
      this.send('refreshModel');
    } catch (e) {
      error(e);
    }
  }

  @action
  async unassignAsset (asset) {
    this.assignedAssets.removeObject(asset);

    let assignment = asset.assignments.findBy('employee.id', this.model.id);

    if (assignment) {
      let { success, error } = this.data.createStatus();
      asset.assignments.removeObject(assignment);

      try {
        await asset.save();
        success(null, true);
        this.send('refreshModel');
      } catch (e) {
        error(e);
      }
    }
  }

  @action
  newAssetCategory (asset) {
    this.assignableAssets.addObject({
      asset,
      stock: null
    });
  }

  @action
  closeAssetModalAndTransition (link, id) {
    this.abortAsset();
    $('#modal__new-asset').modal('hide');
    this.transitionToRoute(link, id);
  }
}
