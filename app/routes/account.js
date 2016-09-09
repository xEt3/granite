import Ember from 'ember';
import authenticated from '../mixins/authenticated';

const { Route, $ } = Ember;

export default Route.extend(authenticated, {
  activity: Ember.inject.service(),

  afterModel () {
    let a = this.get('activity').create({
      description: '{{actor.name.first}} logged in for the first time. Good for you buddy.',
      icon: 'check'
    });
    console.log(a);

    a.then(result => {
      console.log('saved activity');
      console.log(result);
    })
    .catch(err => {
      console.error('there was an error saving activity');
      console.error(err);
    });
  },

  actions: {
    willTransition () {
      $('.account__sidebar').sidebar('hide');
    }
  }
});
