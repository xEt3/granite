import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import { later } from '@ember/runloop';

const STATUS_POLL_INT = 10 * 1000; // 10sec

export default class AccountImportDiscoveredController extends Controller {
  @service ajax
  @service data

  @tracked selected

  queryParams = [ 'service' ]
  service = null

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
    let { success, error } = this.data.createStatus();

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
    console.log('selected:', this.selected);
    // THIS IS NOT WORKING YET
    if (this.selected[name].length === records.length) {
      this.selected[name] = A([]);
    } else {
      this.selected[name] = A(records.mapBy('id'));
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
    let { success, error } = this.data.createStatus();

    try {
      let { taskId } = await this.ajax.post(`/api/v1/integrations/${serviceName}/import`, {
        data: {
          selected,
          resultSet: this.get('model.id')
        }
      });

      this.taskId = taskId;
      this.fetchStatus();
      success(null, true);
    } catch (e) {
      error(e);
    }
  }
}
