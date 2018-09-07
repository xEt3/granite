import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'New Department',
  modelName: 'department',
  auth: service(),

  getModelDefaults () {
    return {
      company: this.get('auth.user.company'),
      creator: this.get('auth.user')
    };
  }
});
