import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

const modelKeys = [ 'model', 'events', 'stage', 'opening', 'screening' ];

@classic
export default class IndexRoute extends Route {
  titleToken = 'Job Application';

  model () {
    return this.modelFor('account.job-opening.campaign.job-application');
  }

  setupController (controller, response) {
    modelKeys.forEach(k => controller.set(k, response[k]));
  }
}
