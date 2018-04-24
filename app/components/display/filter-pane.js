import Component from '@ember/component';

export default Component.extend({
  sendComponentUpdate (path, value) {
    this.get('updateFilter')(path, value);
  }
});
