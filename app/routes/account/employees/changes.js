import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Changes',

  model () {
    return this.get('store').query('change', {
      reviewedOn: { $not: { $type: 9 } },
      sort:       { created: -1 }
    });
  },

  actions: {
    refresh () {
      return true;
    }
  }
});
