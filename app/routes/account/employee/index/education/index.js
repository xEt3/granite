import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Education & Training',

  async model () {
    let q = { employee: this.modelFor('account.employee').id };

    return {
      certifications:      await this.store.query('certification', q),
      trainingAssignments: await this.store.query('training-assignment', q)
    };
  }
});
