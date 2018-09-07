import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Signup',

  model () {
    return this.store.createRecord('company');
  }
});
