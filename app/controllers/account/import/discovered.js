import Controller from 'granite/core/controller';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { later } from '@ember/runloop';

const STATUS_POLL_INT = 10 * 1000; // 10sec

export default class AccountImportDiscoveredController extends Controller {
  @service ajax
  @service data

  @tracked status = null
  @tracked importResult = null

  queryParams = [ 'service' ]
  service = null

  @computed('selected.{employees.[],departments.[],locations.[]}')
  get totalSelected () {
    let selected = this.selected;

    return Object.keys(selected).reduce((total, recordset) => {
      return (selected[recordset] || []).length + total;
    }, 0);
  }

  @action
  scheduleNextPoll () {
    later(this.fetchStatus.bind(this), STATUS_POLL_INT);
  }

  @action
  async fetchStatus () {
    let { success, error } = this.data.createStatus('fetching');

    try {
      let status = await this.store.find('task-status', this.taskId);
      this.status = status;

      // start the next poll schedule, we're still running Jenny
      if (status.running) {
        return this.scheduleNextPoll();
      }

      if (status.error) {
        return error(status.error);
      }

      success('Successfully imported selected records.');
      this.importResult = status.result;
    } catch (e) {
      error(e);
    }
  }

  @action
  toggleAllSelected (name, records) {
    if (this.selected[name].length === records.length) {
      this.set(`selected.${name}`, A([]));
    } else {
      this.set(`selected.${name}`, A(records.mapBy('id')));
    }
  }

  @action
  toggleRowSelection (name, row) {
    let selection = this.selected[name];
    selection[selection.includes(row) ? 'removeObject' : 'addObject'](row);
  }

  @action
  transitionTo (args) {
    this.transitionToRoute(...args);
  }

  @action
  async import () {
    const selected = this.selected,
          serviceName = this.service,
          totalSelected = this.totalSelected;

    if (!totalSelected || !serviceName) {
      return;
    }

    this.status = null;
    let { success, error } = this.data.createStatus('importing');

    try {
      let { taskId } = await this.ajax.post(`/api/v1/integrations/${serviceName}/import`, {
        data: {
          selected,
          resultSet: this.model.id
        }
      });

      this.taskId = taskId;
      await this.fetchStatus();
      success(null, true);
    } catch (e) {
      error(e);
    }
  }
}
