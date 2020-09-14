import Route from 'granite/core/route';
import { inject as service } from '@ember/service';

export default class AddRoute extends Route {
@service auth;

async model () {
  return await this.store.createRecord('openEnrollment', { company: await this.auth.get('user.company.id') });
}
}
