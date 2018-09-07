import Route from '@ember/routing/route';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'New Document',
  auth: service(),

  model () {
    return Promise.resolve();
  }
});
