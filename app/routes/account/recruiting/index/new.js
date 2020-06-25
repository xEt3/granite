import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AccountRecruitingNewRoute extends Route {
  @service auth
  titleToken = 'New Campaign'
  routeType = 'add'
  modelName = 'job-opening'

  async model () {
    return {
      jobOpening:      await super.model(...arguments),
      jobDescriptions: await this.store.findAll('job')
    };
  }

  getModelDefaults () {
    return { creator: this.auth.get('user.employee') };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:        model.jobOpening,
      descriptions: model.jobDescriptions
    });
  }
}
