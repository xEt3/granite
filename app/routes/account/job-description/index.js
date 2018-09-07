import Route from '@ember/routing/route';

export default Route.extend({
  titleToken (model) {
    return 'Job - ' + model.get('title');
  }
});
