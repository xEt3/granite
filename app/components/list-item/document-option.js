import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'item' ],

  actions: {
    addDocument () {
      this.get('onAddition')(this.get('file'));
    },

    removeDocument () {
      this.get('onRemove')(this.get('file'));
    }
  }
});
