import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'New Assets',
  auth: service(),
  modelName: 'asset',

  getModelDefaults () {
    return {
      creator: this.get('auth.user'),
      company: this.get('auth.user.company')
    };
  }
});
