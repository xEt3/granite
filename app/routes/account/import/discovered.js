import Route from '@ember/routing/route';
import { A } from '@ember/array';
import { get } from '@ember/object';

export default Route.extend({
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

    controller.set('selected', A(defaultSelection));
    this._super(...arguments);
  }
});
