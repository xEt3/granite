import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class ActionItemRoute extends Route {
  @service auth;

  title (tokens) {
    return tokens.join(' - ') + ' - ' + this.context.title + ' - Granite HR';
  }

  async model (params) {
    return await this.store.queryRecord('action-item', { title: params.slug.replace(/-(?!!)/g, ' ').replace(/-!/g, '-') });
  }

  async afterModel () {
    this.transferableTargets = await this.store.query('company-user', {
      _id:    { $ne: this.get('auth.user._id') },
      select: 'name employee'
    });
  }

  async setupController (controller, model) {
    Object.assign(controller, {
      model:               model,
      transferableTargets: this.transferableTargets
    });
  }
}
