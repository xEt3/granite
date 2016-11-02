import Ember from 'ember';
import moment from 'moment';

export default function authenticate(app, data) {
  let auth = app.__container__.lookup('service:auth');

  auth.set('session', Ember.Object.create(data || {
    token: 123,
    expires: moment().add(1, 'day').toDate(),
    user: 1
  }));
}
