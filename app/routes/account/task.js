import Route from 'granite/core/route';
import { later, scheduleOnce } from '@ember/runloop';

const STATUS_POLL_INT = 5 * 1000; // 5sec

export default class TaskRoute extends Route {
  titleToken (model) {
    return `Task ${model.name}`;
  }

  model ({ task_id }) {
    return this.store.find('task-status', task_id);
  }

  afterModel (model) {
    // running, or if not processed and not errored, schedule a scheduler :)
    if (model.running || !model.status.includes('Processed') && !model.error) {
      scheduleOnce('afterRender', this, 'scheduleRefresh');
    }
  }

  // Does a poll
  scheduleRefresh () {
    later(this.refresh.bind(this), STATUS_POLL_INT);
  }
}
