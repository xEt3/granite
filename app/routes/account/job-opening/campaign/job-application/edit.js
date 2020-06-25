import Route from 'granite/core/route';
import { action } from '@ember/object';
import { resolve } from 'rsvp';

export default class AccountJobOpeningCampaignJobApplicationEditRoute extends Route {
  titleToken = 'Edit'

  async model () {
    let parentModel = this.modelFor('account.job-opening.campaign.job-application');

    return {
      model: {
        jobApplication: parentModel.model,
        applicant:      await resolve(parentModel.model.applicant)
      },
      pipeline: (await this.store.query('recruiting-pipeline', {
        $or:   [{ jobOpenings: { $in: [ parentModel.opening.id ] } }, { 'jobOpenings.0': { $exists: false } }],
        limit: 1,
        sort:  { jobOpenings: -1 }
      })).firstObject
    };
  }

  setupController (controller, response) {
    controller.setProperties({
      model:    response.model,
      pipeline: response.pipeline
    });
  }

  @action
  willTransition (transition) {
    let model = this.controller.model,
        jobAppHasChangedAttributes = Object.keys(model.jobApplication.changedAttributes()).length > 0,
        appHasChangedAttributes = Object.keys(model.applicant.changedAttributes()).length > 0;

    if (jobAppHasChangedAttributes || appHasChangedAttributes && !confirm('Are you sure you want to abandon progress on this page?')) {
      transition.abort();
    } else {
      if (jobAppHasChangedAttributes) {
        model.jobApplication.rollbackAttributes();
      }

      if (appHasChangedAttributes) {
        model.applicant.rollbackAttributes();
      }

      return true;
    }
  }
}
