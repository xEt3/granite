import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';
import {resolve} from 'rsvp';

export default Route.extend(add, {
  modelName: 'location',
  auth: service(),

  getModelDefaults () {
    return resolve(this.get('auth.user.company'))
      .then(company => {
        return {
          company,
          addressState: company.addressState,
          creator: this.get('auth.user')
        };
      });
  }
});
