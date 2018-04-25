import Component from '@ember/component';

export default Component.extend({
  sendComponentUpdate (path, value) {
    this.get('onChange')(path, value);
  },

  resetFilter (path) {
    this.sendComponentUpdate(path, undefined);
  }
});
