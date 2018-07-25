import Controller from '@ember/controller';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  ajax: service(),
  queryParams: [ 'service' ],
  service: null,

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
            serviceName = this.get('service'),
            totalSelected = this.get('totalSelected');

      if (!totalSelected || !serviceName) {
        return;
      }

      this.ajaxStart();

      this.get('ajax').post(`/api/v1/integrations/${serviceName}/import`, {
        selected,
        resultSet: this.get('model._id')
      })
      .then(result => {
        this.ajaxSuccess(`Successfully imported ${totalSelected} records.`);
      });
    }
  }
});
