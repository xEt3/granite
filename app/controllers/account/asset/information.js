import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed } = Ember;

export default Controller.extend(addEdit, {
  addingAttribute: false,

  attributeHelper: computed('addingAttribute', function () {
    return this.get('addingAttribute') ? 'Cancel' : 'Add a new attribute';
  }),

  afterSave () {
    this.setProperties({
      pendingAttribute: null,
      addingAttribute: false
    });
  },

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    },

    removeAttribute ( attr ) {
      let model = this.get('model');

      model.get('attributes').removeObject(attr);
      this.send('save', model);
    },

    saveAttribute () {
      let model = this.get('model'),
          attr = this.get('pendingAttribute');

      this.ajaxStart();

      if ( !attr ) {
        this.ajaxError('Attribute name is required.');
        return;
      }

      model.get('attributes').addObject(attr);
      this.send('save', model);
    }
  }
});
