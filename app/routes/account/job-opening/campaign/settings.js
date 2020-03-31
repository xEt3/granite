import Route from 'granite/core/route';
import { action } from '@ember/object';
import $ from 'jquery';

export default class AccountJobOpeningCampaignSettingsRoute extends Route {
  titleToken = 'Settings'
  routeType = 'edit'

  async model () {
    let jobOpening = this.modelFor('account.job-opening'),
        defaultPipeline = await this.store.query('recruiting-pipeline', { 'jobOpenings.0': { $exists: false } }),
        customPipeline = await this.store.query('recruiting-pipeline', { jobOpenings: { $in: [ jobOpening.id ] } });

    return {
      jobOpening,
      defaultPipeline: defaultPipeline ? defaultPipeline.firstObject : defaultPipeline,
      customPipeline:  customPipeline ? customPipeline.firstObject : customPipeline,
      locations:       this.store.findAll('location'),
      employees:       this.store.query('employee', {
        email:       { $exists: true },
        companyUser: { $exists: true }
      })
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

  @action
  willTransition () {
    $('#modal__add-stage').modal('hide');
  }
}
