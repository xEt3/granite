import Route from 'granite/core/route';

export default class AccountJobOpeningSetupScreeningRoute extends Route {
  titleToken = 'Screening'
  modelName =  'form'
  routeType = 'add'

  modelDefaults = { formType: 'screening' }

  async model () {
    let jobOpening = this.modelFor('account.job-opening');

    // Attempt to find a form for the current job opening
    let response = await this.store.query('form', {
      targetType: 'JobOpening',
      targetId:   jobOpening.id
    });
    // Use the found form or otherwise make a new form
    let form = await response.firstObject || await super.model(...arguments);

    return {
      form,
      jobOpening
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model: model.jobOpening,
      form:  model.form
    });
  }
}
