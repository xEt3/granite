import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'New Document',
  auth:       service(),
  modelName:  'file-assignment',

  getModelDefaults () {
    return {
      creator:  this.get('auth.user.employee'),
      company:  this.get('auth.user.company'),
      employee: this.modelFor('account.employee')
    };
  }
});
