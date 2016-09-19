import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'item' ],

  actions: {
    delete() {
      this.get('onDelete')(this.get('location'));
    },

    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
