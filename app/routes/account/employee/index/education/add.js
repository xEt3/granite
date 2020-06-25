import Route from 'granite/core/route';

const typeMap = {
  'certification':       'certification',
  'training assignment': 'trainingAssignment'
};

export default class AccountEmployeeEducationAddRoute extends Route {
  routeType = 'add'

  queryParams = { type: { refreshModel: true } }

  titleToken (model) {
    return `Add a new ${model.newRecord.constructor.modelName}`;
  }

  getModelDefaults () {
    return { employee: this.modelFor('account.employee') };
  }

  async model (params) {
    if (!typeMap[params.type]) {
      throw new Error(`${params.type} is not a supported education type`);
    }

    const type = typeMap[params.type];

    this.modelName = type;

    return {
      newRecord:        await super.model(...arguments),
      dataDependencies: type === 'trainingAssignment' && { webinars: await this.store.findAll('webinar-authorization') }
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:            model.newRecord,
      dataDependencies: model.dataDependencies,
      employee:         this.modelFor('account.employee')
    });
  }
}
