import Route from '@ember/routing/route';
import add from 'granite/mixins/route-abstractions/add';

const typeMap = {
  'certification':       'certification',
  'training-assignment': 'trainingAssignment'
};

export default Route.extend(add, {
  queryParams: { type: { refreshModel: true } },

  async model (params) {
    if (!typeMap[params.type]) {
      throw new Error(`${params.type} is not a supported education type`);
    }

    this.set('modelName', typeMap[params.type]);
    return this._super(...arguments);
  },

  setupController (controller) {
    this._super(...arguments);
    controller.setProperties({ employee: this.modelFor('account.employee') });
  }
});
