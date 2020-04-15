import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class EditRoute extends Route {
  model (params) {
    return this.store.find('department', params.department_id);
  }
}
