import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'item' ],

  actions: {
    delete() {
      this.get('onDelete')(this.get('department'));
    },

    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
