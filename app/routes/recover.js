import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Recover Account',

  model (params) {
    return params.recovery_id;
  }
});
