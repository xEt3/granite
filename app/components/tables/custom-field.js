import Component from '@ember/component';

export default Component.extend({
  tagName: 'tr',

  actions: {
    editValue () {
      this.setProperties({
        editingValue: true,
        newValue: this.get('value')
      });
    },

    cancelEdit () {
      this.set('editingValue', false);
    },

    saveEdit () {
      this.get('onValueChange')(this.get('key'), this.get('newValue'));
      this.set('editingValue', false);
    },

    delete () {
      this.get('onDelete')(this.get('key'));
    }
  }
});
