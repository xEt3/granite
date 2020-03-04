import Controller from '@ember/controller';
import Object from '@ember/object';
import { computed, get } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { singularize } from 'ember-inflector';
import $ from 'jquery';
import ajaxStatus from 'granite/mixins/ajax-status';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(ajaxStatus, addEdit, {
  auth: service(),

  groupedAssignedAssets: computed('assignedAssets.[]', 'asset.assignments', function () {
    let assignedAssets = this.get('assignedAssets'),
        groups = A();

    let findGroup = asset => groups.findBy('asset.id', get(asset, 'id'));

    assignedAssets.forEach(stock => {
      let asset = get(stock, 'asset'),
          existingGroup = findGroup(asset);

      if (!existingGroup) {
        groups.addObject(Object.create({
          asset,
          assets: A()
        }));

        existingGroup = findGroup(asset);
      }

      existingGroup.get('assets').addObject(stock);
    });

    return groups;
  }),

  splitAssets: computed('assignableAssets.[]', 'jobSuggestedAssets.[]', 'asset.assignments', function () {
    let jobSuggestedAssets = this.get('jobSuggestedAssets'),
        assignableAssets = this.get('assignableAssets'),
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
  }),

  actions: {
    createAsset (category) {
      let user = this.get('auth.user');

      this.set('pendingAssetItem', this.store.createRecord('asset-item', {
        asset:      category,
        identifier: this.get('model.firstName') + '\'s ' + singularize(category.get('name')),
        creator:    user,
        company:    user.get('company')
      }));

      $('#modal__new-asset').modal({
        onHidden: () => {
          if (this.isDestroyed || this.isDestroying) {
            $('#modal__new-asset').remove();
          }

          $('#modal__new-asset').appendTo($('#modal__new-asset--placeholder'));
        }
      }).modal('show');
    },

    saveAsset () {
      this.ajaxStart();

      this.get('pendingAssetItem').save()
      .then(asset => {
        this.send('selectAsset', asset);
        $('#modal__new-asset').modal('hide');
      })
      .catch(this.ajaxError.bind(this));
    },

    abortAsset () {
      let asset = this.get('pendingAssetItem');

      asset.destroyRecord()
      .then(() => {
        this.set('pendingAssetItem', null);
        $('#modal__new-asset').modal('hide');
      });
    },

    async selectAsset (asset) {
      this.ajaxStart();

      let user = this.get('auth.user'),
          employee = this.get('model');

      if (await asset.get('assignments').findBy('employee.id', employee.get('id'))) {
        this.ajaxSuccess(null, true);
        return;
      }

      let assignment = await this.store.createRecord('asset-assignment', {
        employee,
        assigner: user
      });


      await asset.get('assignments').addObject(assignment);


      asset.save()
      .then(assetItem => {
        this.get('assignedAssets').addObject(assetItem);
        this.ajaxSuccess(null, true);
        this.send('refresh');
      })
      .catch(this.ajaxError.bind(this));
    },

    async unassignAsset (asset) {
      await this.get('assignedAssets').removeObject(asset);
      console.log('here is the asset', asset);

      let assignment = await asset.get('assignments').findBy('employee.id', this.get('model.id'));

      if (assignment) {
        this.ajaxStart();

        await asset.get('assignments').removeObject(assignment);

        try {
          await asset.save();
          this.ajaxSuccess(null, true);
          // this.send('refresh');
        } catch (e) {
          this.ajaxError(e);
        }
      }
    },

    newAssetCategory (asset) {
      this.get('assignableAssets').addObject({
        asset,
        stock: null
      });
    },

    closeAssetModalAndTransition (link, id) {
      this.send('abortAsset');
      $('#modal__new-asset').modal('hide');
      this.transitionToRoute(link, id);
    }
  }
});
