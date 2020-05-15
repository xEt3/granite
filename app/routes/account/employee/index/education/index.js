import Route from 'granite/core/route';

export default class IndexRoute extends Route {
  titleToken = 'Education & Training';

  async model () {
    let q = { employee: this.modelFor('account.employee').id };

    return {
      certifications:      await this.store.query('certification', q),
      trainingAssignments: await this.store.query('training-assignment', q)
    };
  }
}
