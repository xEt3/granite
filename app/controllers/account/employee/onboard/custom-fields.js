import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed } = Ember;

export default Controller.extend(addEdit, {
  adding: false,
  showTable: computed.or('objectLength', 'adding'),

  objectLength: computed('model.customFields', function () {
    let cf = this.get('model.customFields');
    return cf ? Object.keys(cf).length : 0;
  }),

  customFieldHelper: computed('addingCustomFieldName', function () {
    return this.get('addingCustomFieldName') ? 'Cancel' : 'Add a new custom field';
  }),

  actions: {
    beginAddingCustomField () {
      this.set( 'adding', true );
    },

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

      this.saveModel().then(() => {
        this.setProperties({
          pendingCustomFieldValue: null,
          pendingCustomFieldName: null,
          adding: false
        });
      });
    },

    editValue ( key, newValue ) {
      let model = this.get('model');
      model.set(`customFields.${key}`, newValue);
      this.saveModel();
    },

    deleteCustomField ( key ) {
      let model = this.get('model'),
          customFields = model.get('customFields');

      delete customFields[key];

      model.set('customFields', customFields);
      this.saveModel();
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
