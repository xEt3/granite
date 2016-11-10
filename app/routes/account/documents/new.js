import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route, RSVP: { Promise }, inject } = Ember;

export default Route.extend(add, {
  auth: inject.service(),

  model () {
    return Promise.resolve();
  }
});
