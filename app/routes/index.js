import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class IndexRoute extends Route {
  @service
  headData;

  title = 'Granite Human Resources | Next-Gen HRIS';

  afterModel() {
    this.set('headData.description', `A Human Resources System for ${moment().format('YYYY')}. Granite HR helps you conquer recruiting, asset management, projects, & employee information.`);
  }
}
