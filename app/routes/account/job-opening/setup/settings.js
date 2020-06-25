import Route from 'granite/core/route';

export default class AccountJobOpeningSetupSettingsRoute extends Route {
  titleToken = 'Settings'

  async model () {
    let jobOpening = this.modelFor('account.job-opening'),
        defaultPipelineResults = await this.store.query('recruiting-pipeline', { 'jobOpenings.0': { $exists: false } }),
        customPipelineResults = await this.store.query('recruiting-pipeline', { jobOpenings: { $in: [ jobOpening.id ] } });


    return {
      jobOpening,
      locations: await this.store.findAll('location'),
      employees: await this.store.query('employee', {
        email:       { $exists: true },
        companyUser: { $exists: true }
      }),

      defaultPipeline: defaultPipelineResults ? defaultPipelineResults.firstObject : defaultPipelineResults,
      customPipeline:  customPipelineResults ? customPipelineResults.firstObject : customPipelineResults
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:           model.jobOpening,
      locations:       model.locations,
      employees:       model.employees,
      defaultPipeline: model.defaultPipeline,
      customPipeline:  model.customPipeline
    });
  }
}
