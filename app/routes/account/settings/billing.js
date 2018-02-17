import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  auth: service(),
  ajax: service(),

  model () {
    return this.get('ajax').request(`/api/v1/company/${this.get('auth.user.company.id')}/billing`)
    .then(result => result.subscription);
  }
});
