import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';
import { singularize } from 'ember-inflector';
import { inject as service } from '@ember/service';
import $ from 'jquery';

export default Controller.extend(ajaxStatus, {
  auth: service(),

  actions: {
    createAsset ( category ) {
      let user = this.get('auth.user');

      this.set('pendingAssetItem', this.store.createRecord('asset-item', {
        asset: category,
        identifier: this.get('model.firstName') + '\'s ' + singularize(category.get('name')),
        creator: user,
        company: user.get('company')
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

    selectAsset ( asset ) {
      this.ajaxStart();

      let user = this.get('auth.user'),
          employee = this.get('model');

      if ( asset.get('assignments').findBy('employee.id', employee.get('id')) ) {
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
    },

    newAssetCategory () {
      this.send('refreshModel');
    }
  }
});
