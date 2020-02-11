import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AssignController extends Controller {
  @service data

  @tracked employeesToAssign = []

  @action
  async save () {
    const { authorization, webinar } = this.model;

    const trainingAssignments = this.employeesToAssign.map(employee => {
      return this.store.createRecord('training-assignment', {
        employee,
        name:    `Watch ${webinar.title}`,
        webinar: authorization,
        status:  'Assigned'
      });
    });

    await this.data.saveRecord(trainingAssignments, 'webinarAssignment');

    if (!this.data.statuses.webinarAssignment.error) {
      this.transitionToRoute('account.education.webinars');
    }
  }
}
