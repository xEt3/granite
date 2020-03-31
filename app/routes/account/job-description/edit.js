import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AccountJobDescriptionEditRoute extends Route {
  @service auth
  titleToken = 'Edit Description'
  bypassModelHook = true
  routeType = 'edit'

  async model () {
    return {
      job:         await super.model(...arguments),
      assets:      await this.store.findAll('asset'), // not so cached
      departments: this.departments // cached
    };
  }

  get departments () {
    return this.store.findAll('department');
  }

  getModelDefaults () {
    return { creator: this.auth.get('user.employee') };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:       model.job,
      assets:      model.assets,
      departments: model.departments
    });
  }
}
