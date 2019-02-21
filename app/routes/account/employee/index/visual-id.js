import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),

  model () {
    let employee = this.modelFor('account.employee');

    return this.get('ajax').request(`/api/v1/eeo/visual-id/${employee.get('id')}`);
  }
});
