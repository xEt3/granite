import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'item' ],

  actions: {
    delete () {
      this.onDelete(this.location);
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
