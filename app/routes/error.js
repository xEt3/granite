import Ember from 'ember';

const { Route } = Ember;

export default Route.extend({
  titleToken: 'Error',

  afterModel () {
    if ( !this.get('controller.fromError') ) {
      return this.transitionTo('index');
    }
  }
});
