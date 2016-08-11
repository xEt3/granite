import Ember from 'ember';
import { singularize } from 'ember-inflector';
import ajaxStatus from 'granite/mixins/ajax-status';

const { Controller, A, inject, computed, get } = Ember;

export default Controller.extend(ajaxStatus, {
  auth: inject.service(),

  groupedAssignedAssets: computed('assignedAssets.[]', function () {
    let assignedAssets = this.get('assignedAssets'),
        groups = A();

    let findGroup = asset => groups.findBy('asset.id', get(asset, 'id'));

    assignedAssets.forEach(stock => {
      let asset = get(stock, 'asset'),
          existingGroup = findGroup(asset);

      if ( !existingGroup ) {
        groups.addObject(Ember.Object.create({
          asset,
          assets: A()
        }));

        existingGroup = findGroup(asset);
      }

      existingGroup.get('assets').addObject(stock);
    });

    return groups;
  }),

  actions: {
    createAsset ( category ) {
      let user = this.get('auth.user');

      this.set('pendingAssetItem', this.store.createRecord('asset-item', {
        asset: category,
        identifier: this.get('model.firstName') + '\'s ' + singularize(category.get('name')),
        creator: user,
        company: user.get('company')
      }));

      Ember.$('.new-asset').modal('show');
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

    selectAsset ( asset ) {
      this.ajaxStart();

      let user = this.get('auth.user');

      let assignment = this.store.createRecord('asset-assignment', {
        employee: this.get('model'),
        assigner: user
      });

      asset.get('assignments').addObject(assignment);

      asset.save()
      .then(assetItem => {
        this.get('assignedAssets').addObject(assetItem);
        this.ajaxSuccess(null, true);
      })
      .catch(this.ajaxError.bind(this));
    },

    unassignAsset ( asset ) {
      this.get('assignedAssets').removeObject(asset);

      let assignment = asset.get('assignments').findBy('employee.id', this.get('model.id'));

      if ( assignment ) {
        this.ajaxStart();
        asset.get('assignments').removeObject(assignment);

        asset.save()
        .then(() => this.ajaxSuccess(null, true))
        .catch(this.ajaxError.bind(this));
      }
    }
  }
});
