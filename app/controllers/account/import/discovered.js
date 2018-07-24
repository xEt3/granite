import Controller from '@ember/controller';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend({
  ajax: service(),

  totalSelected: computed('selected.{employees.[],departments.[],locations.[]}', function () {
    let selected = this.get('selected');

    return Object.keys(selected).reduce((total, recordset) => {
      return (selected[recordset] || []).length + total;
    }, 0);
  }),

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
      this.transitionToRoute(...args);
    },

    import () {
      const selected = this.get('selected'),
            totalSelected = this.get('totalSelected');

      if (!totalSelected) {
        return;
      }

      this.ajaxStart();

      // this.get('ajax').post()
    }
  }
});
