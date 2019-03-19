import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData: service(),
  title:    'Granite Human Resources | Next-Gen HRIS',

  afterModel () {
    this.set('headData.description', `A Human Resources System for ${moment().format('YYYY')}. Granite HR helps you conquer recruiting, asset management, projects, & employee information.`);
  }
});
