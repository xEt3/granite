import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  actions: {
    toggleAllSelected (name, records) {
      if (this.get(`selected.${name}.length`) === records.length) {
        this.set(`selected.${name}`, A([]));
      } else {
        this.set(`selected.${name}`, A(records.mapBy('id')));
      }
    },

    toggleRowSelection (name, row) {
      let selection = this.get(`selected.${name}`);
      selection[selection.includes(row) ? 'removeObject' : 'addObject'](row);
    },

    transitionTo (args) {
      console.log(args);
      this.transitionToRoute(...args);
    }
  }
});
