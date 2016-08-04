import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  model () {
    return {
      name: 'Cell phone',
      created: new Date()
    };
  }
});
