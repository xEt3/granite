import Route from 'granite/core/route';

export default class AccountJobOpeningSetupSourcesRoute extends Route {
  titleToken = 'Sources'

  async model () {
    let jobOpening =  this.modelFor('account.job-opening');

    return {
      jobOpening,
      job:       await jobOpening.job,
      automatic: await this.store.findAll('applicant-source'),
      manual:    await this.store.findAll('manual-applicant-source')
    };
  }

  setupController (controller, model) {
    if (!model.jobOpening.description && !model.jobOpening.title) {
      model.jobOpening.setProperties({
        description: model.job.get('description'),
        title:       model.job.get('title')
      });
    }

    controller.setProperties({
      model:   model.jobOpening,
      sources: {
        manual:    model.manual,
        automatic: model.automatic
      }
    });
  }
}
