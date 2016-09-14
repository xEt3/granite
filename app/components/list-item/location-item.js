import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'ui fluid card' ],

  actions: {
    delete() {
      this.get('onDelete')(this.get('location'));
    },

    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
