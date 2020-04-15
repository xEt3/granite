import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'item' ],

  actions: {
    delete () {
      this.onDelete(this.department);
    },

    toggleProperty (prop) {
      this.toggleProperty(prop);
    }
  }
});
