import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'item' ],

  actions: {
    delete () {
      this.get('onDelete')(this.get('department'));
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
