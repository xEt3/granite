import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import RSVP from 'rsvp';

@classic
export default class ActionItemRoute extends Route {
  @service
  auth;

  title(tokens) {
    return tokens.join(' - ') + ' - ' + this.context.title + ' - Granite HR';
  }

  model(params) {
    return RSVP.hash({
      actionItem:   this.store.queryRecord('action-item', { title: params.slug.replace(/-(?!!)/g, ' ').replace(/-!/g, '-') }),
      companyUsers: this.store.query('company-user', {
        _id:    { $ne: this.get('auth.user._id') },
        select: 'name employee'
      })
    })
    .then(result => {
      this.set('transferableTargets', result.companyUsers);
      return result.actionItem;
    });
  }

  setupController(controller, model) {
    controller.setProperties({
      model,
      transferableTargets: this.get('transferableTargets')
    });
  }
}
