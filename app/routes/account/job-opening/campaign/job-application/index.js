import Route from 'granite/core/route';

const modelKeys = [ 'model', 'events', 'stage', 'opening', 'screening' ];

export default class IndexRoute extends Route {
  titleToken = 'Job Application';

  model () {
    return this.modelFor('account.job-opening.campaign.job-application');
  }

  setupController (controller, response) {
    modelKeys.forEach(k => controller.set(k, response[k]));
  }
}
