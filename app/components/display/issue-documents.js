import Component from '@ember/component';

export default Component.extend({
  actions: {
    delete () {
      this.get('onDelete')(this.get('document'));
    }
  }
});
