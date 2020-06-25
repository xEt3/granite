import { inject as service } from '@ember/service';
import Route from 'granite/core/route';

export default class IndexRoute extends Route {
  @service headData;

  title = 'Granite Human Resources | Next-Gen HRIS';

  afterModel () {
    this.headData.set('description', `A Human Resources System for ${moment().format('YYYY')}. Granite HR helps you conquer recruiting, asset management, projects, & employee information.`);
  }
}
