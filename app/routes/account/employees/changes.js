import Route from '@ember/routing/route';

export default Route.extend({
  model () {
    return this.get('store').query('change', {
      reviewedOn: { $not: { $type: 9 } },
      sort: { created: -1 }
    });
  }
});
