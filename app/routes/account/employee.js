import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';

@classic
export default class EmployeeRoute extends Route.extend(refreshable) {
  titleToken(model) {
    return model.fullName;
  }

  model(params) {
    return this.store.find('employee', params.id);
  }
}
