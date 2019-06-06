import Controller from '@ember/controller';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { later } from '@ember/runloop';
import ajaxStatus from 'granite/mixins/ajax-status';

const STATUS_POLL_INT = 10 * 1000; // 10sec

export default Controller.extend(ajaxStatus, {
  ajax:        service(),
  queryParams: [ 'service' ],
  service:     null,

  totalSelected: computed('selected.{employees.[],departments.[],locations.[]}', function () {
    let selected = this.get('selected');

    return Object.keys(selected).reduce((total, recordset) => {
      return (selected[recordset] || []).length + total;
    }, 0);
  }),

  scheduleNextPoll () {
    later(this.fetchStatus.bind(this), STATUS_POLL_INT);
  },

  async fetchStatus () {
    let status = await this.store.find('task-status', this.taskId);

    this.set('status', status);

    // start the next poll schedule, we're still running Jenny
    if (status.running) {
      return this.scheduleNextPoll();
    }

    if (status.error) {
      return this.ajaxError(status.error);
    }

    this.ajaxSuccess('Successfully imported selected records.');
    this.set('importResult', status.result);
  },

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

      this.set('status', null);
      this.ajaxStart();

      this.get('ajax').post(`/api/v1/integrations/${serviceName}/import`, {
        data: {
          selected,
          resultSet: this.get('model.id')
        }
      })
      .then(({ taskId }) => {
        this.set('taskId', taskId);
        this.fetchStatus();
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
