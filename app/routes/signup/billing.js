import Ember from 'ember';

export default Ember.Route.extend({
  model () {
    return Ember.$.get('/api/v1/bt/token');
  }
});
