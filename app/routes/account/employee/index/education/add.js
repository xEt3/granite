import Route from '@ember/routing/route';
import add from 'granite/mixins/route-abstractions/add';

const typeMap = {
  'certification':       'certification',
  'training assignment': 'trainingAssignment'
};

export default Route.extend(add, {
  queryParams: { type: { refreshModel: true } },

  titleToken (model) {
    return `Add a new ${model.constructor.modelName}`;
  },

  getModelDefaults () {
    return { employee: this.modelFor('account.employee') };
  },

  async model (params) {
    if (!typeMap[params.type]) {
      throw new Error(`${params.type} is not a supported education type`);
    }

    const type = typeMap[params.type];

    this.set('modelName', type);

    return {
      newRecord:        await this._super(...arguments),
      dataDependencies: type === 'trainingAssignment' && { webinars: await this.store.findAll('webinar-authorization') }
    };
  },

  setupController (controller, model) {
    controller.setProperties({
      model:            model.newRecord,
      dataDependencies: model.dataDependencies,
      employee:         this.modelFor('account.employee')
    });
  }
});
