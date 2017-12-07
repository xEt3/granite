import Ember from 'ember';

const { Route, RSVP: { hash } } = Ember;

export default Route.extend({
  model () {
    return hash({
      templates: this.store.query('template', {}),
      definitions: this.store.findAll('template-definition')
    });
  }
});
