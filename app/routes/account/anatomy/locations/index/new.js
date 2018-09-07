import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { resolve } from 'rsvp';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'New Location',
  modelName: 'location',
  auth: service(),

  getModelDefaults () {
    return resolve(this.get('auth.user.company'))
    .then(company => {
      return {
        company,
        addressState: company.get('addressState'),
        creator: this.get('auth.user')
      };
    });
  }
});
