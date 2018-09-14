import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'item' ],

  actions: {
    delete () {
      this.get('onDelete')(this.get('location'));
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
