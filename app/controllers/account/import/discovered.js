import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import { A } from '@ember/array';
import { later } from '@ember/runloop';
import ajaxStatus from 'granite/mixins/ajax-status';

const STATUS_POLL_INT = 10 * 1000; // 10sec

@classic
export default class DiscoveredController extends Controller.extend(ajaxStatus) {
  @service
  ajax;

  queryParams = [ 'service' ];
  service = null;

  @computed('selected.{employees.[],departments.[],locations.[]}')
  get totalSelected () {
    let selected = this.selected;

    return Object.keys(selected).reduce((total, recordset) => {
      return (selected[recordset] || []).length + total;
    }, 0);
  }

  scheduleNextPoll () {
    later(this.fetchStatus.bind(this), STATUS_POLL_INT);
  }

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
  }

  @action
  toggleAllSelected (name, records) {
    if (this.get(`selected.${name}.length`) === records.length) {
      this.set(`selected.${name}`, A([]));
    } else {
      this.set(`selected.${name}`, A(records.mapBy('id')));
    }
  }

  @action
  toggleRowSelection (name, row) {
    let selection = this.get(`selected.${name}`);
    selection[selection.includes(row) ? 'removeObject' : 'addObject'](row);
  }

  @action
  transitionTo (args) {
    this.transitionToRoute(...args);
  }

  @action
  import () {
    const selected = this.selected,
          serviceName = this.service,
          totalSelected = this.totalSelected;

    if (!totalSelected || !serviceName) {
      return;
    }

    this.set('status', null);
    this.ajaxStart();

    this.ajax.post(`/api/v1/integrations/${serviceName}/import`, {
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
