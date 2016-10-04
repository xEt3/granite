import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed } = Ember;

export default Controller.extend(addEdit, {
  addingCustomFieldName: false,

  customFieldHelper: computed('addingCustomFieldName', function () {
    return this.get('addingCustomFieldName') ? 'Cancel' : 'Add a new custom field';
  }),

  afterSave () {
    this.setProperties({
      pendingCustomFieldName: null,
      addingCustomFieldName: false
    });
  },

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    },

    removeCustomFieldName ( attr ) {
      let model = this.get('model');

      model.get('customFields').removeObject(attr);
      this.send('save', model);
    },

    saveCustomFieldName () {
      let model = this.get('model'),
          attr = this.get('pendingCustomFieldName');

      this.ajaxStart();

      if ( !attr ) {
        this.ajaxError('Field name is required.');
        return;
      }

      model.get('customFields').addObject(attr);
      this.send('save', model);
    }

    // saveCustomFieldName () {
    //   let model = this.get('model'),
    //       attr = this.get('pendingCustomFieldName');
    //
    //   this.ajaxStart();
    //
    //   if ( !attr ) {
    //     this.ajaxError('Custom Field name is required.');
    //     return;
    //   }
    //
    //   model.get('customFields').addObject(attr);
    //   this.send('save', model);
    // }
  }
});
