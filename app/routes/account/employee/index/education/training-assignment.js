import Route from 'granite/core/route';

export default class AccountEmployeeTrainingAssignmentRoute extends Route {
  titleToken (model) {
    return model.name;
  }

  async model ({ assignment_id }) {
    let w = await this.store.find('TrainingAssignment', assignment_id);
    return w;
  }
}
