import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, computed } = Ember;

export default Controller.extend(addEdit, del, {
  addingCustomFieldName: false,
  addingCustomFieldValue: false,
  adding: computed.or('addingCustomFieldName', 'addingCustomFieldValue'),

  customFieldHelper: computed('addingCustomFieldName', function () {
    return this.get('addingCustomFieldName') ? 'Cancel' : 'Add a new custom field';
  }),

  afterSave () {
    // this.setProperties({
    //   pendingCustomFieldName: null,
    //   addingCustomFieldName: false
    // });
  },

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    },

    createCustomField () {
      Ember.$('.new-custom-field').modal('show');
    },
    saveCustomField () {
      let model = this.get('model'),
          attr = this.get('pendingCustomFieldName'),
          value = this.get('pendingCustomFieldValue');

      this.ajaxStart();

      if ( !attr ) {
        this.ajaxError('Custom field name is required.');
        return;
      } else if ( !value ) {
        this.ajaxError('Custom field value is required.');
        return;
      }


      if ( !model.get('customFields') ) {
        model.set('customFields', {});
      }
      model.set(`customFields.${attr}`, value);
      this.send('save', model);
      this.setProperties({
        addingCustomFieldValue: true
      });
    },

    abortCustomField() {

    }

  }
});

// actions: {
//   createAsset ( category ) {
//     let user = this.get('auth.user');
//
//     this.set('pendingAssetItem', this.store.createRecord('asset-item', {
//       asset: category,
//       identifier: this.get('model.firstName') + '\'s ' + singularize(category.get('name')),
//       creator: user,
//       company: user.get('company')
//     }));
//
//     Ember.$('.new-asset').modal('show');
//   },
//
//   saveAsset () {
//     this.ajaxStart();
//
//     this.get('pendingAssetItem').save()
//     .then(asset => {
//       this.send('selectAsset', asset);
//     })
//     .catch(this.ajaxError.bind(this));
//   },
//
//   abortAsset () {
//     let asset = this.get('pendingAssetItem');
//
//     asset.destroyRecord()
//     .then(() => {
//       this.set('pendingAssetItem', null);
//     });
//   },
