import Route from '@ember/routing/route';
import { scheduleOnce } from '@ember/runloop';
import { A } from '@ember/array';
import { get } from '@ember/object';

export default Route.extend({
  async beforeModel (transition) {
    const resultSetId = ((transition.params || {})['account.import.discovered'] || {}).result_set_id || (transition.routeInfos[transition.routeInfos.length - 1].context || {})._id,
          serviceName = transition.to.queryParams.service;

    try {
      const currentTask = (await this.store.query('task-status', {
        running:           true,
        'context.service': serviceName,
        'context.method':  'import'
      })).get('firstObject') ||
      // no running task, maybe there's one that's done?
      (await this.store.query('task-status', {
        running:               false,
        error:                 { $not: { $type: 2 } }, // string type
        'context.service':     serviceName,
        'context.method':      'import',
        'context.resultSetId': resultSetId
      })).get('firstObject');

      if (!currentTask || currentTask.context.resultSetId === resultSetId) {
        this.set('matchedTask', currentTask);
        return;
      }

      transition.abort();
      this.transitionTo('account.import.discovered', currentTask.context.resultSetId, { queryParams: { service: serviceName } });
    } catch (e) {
      if (e.status === 404) {
        return;
      }

      throw e;
    }
  },

  model (params) {
    return this.store.find('result-set', params.result_set_id);
  },

  setupController (controller, model) {
    let recordSets = get(model, 'deserialized');

    let defaultSelection = recordSets.reduce((selected, recordSet) => Object.assign({
      [recordSet.name]: recordSet.records
      .filter(({ duplicate }) => !duplicate)
      .map(({ id }) => id)
    }, selected), {});

    controller.setProperties({
      selected:     A(defaultSelection),
      importResult: null
    });

    if (this.matchedTask) {
      controller.setProperties({
        status:       this.matchedTask,
        working:      this.matchedTask.running,
        taskId:       this.matchedTask.id,
        importResult: this.matchedTask.result
      });

      if (this.matchedTask.running) {
        scheduleOnce('afterRender', controller.fetchStatus.bind(controller));
      }
    }

    this._super(...arguments);
  }
});
