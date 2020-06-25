import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';
import moment from 'moment';

export default class AccountActionItemTodoController extends Controller {
  @service auth
  @service data

  @tracked addedTodos =   A()
  @tracked addingTodo =   false

  get userTodos () {
    let checklist = this.model.incompleteTodos;
    return checklist ? checklist.filterBy('assignedTo.id', this.auth.get('user.employee.id')) : [];
  }

  @action
  afterSave () {
    this.addedTodos.forEach(t => {
      t.destroy();
      this.model.checklist.removeObject(t);
    });
    this.addedTodos = A();
  }

  @action
  async addTodo () {
    const title = this.pendingTodo,
          assignee = this.pendingTodoAssignee;

    let item = await this.store.createRecord('checklist-item', { title });

    if (assignee) {
      item.setProperties({
        assignedTo: assignee,
        assignedBy: await this.auth.get('user.employee'),
        assignedOn: new Date()
      });
    }

    this.model.checklist.addObject(item);
    this.addedTodos.addObject(item);
    await this.data.saveRecord(this.model);
    this.afterSave();

    this.setProperties({
      pendingTodo:         null,
      pendingTodoAssignee: null
    });
  }

  @action
  changeCompletedStatus (todo) {
    if (!todo.completedOn) {
      todo.setProperties({
        completedBy: this.auth.get('user.employee'),
        completedOn: moment().toDate()
      });
    } else {
      todo.setProperties({
        completedBy: null,
        completedOn: null
      });
    }
    this.data.saveRecord(this.model);
  }

  @action
  changeAssignee (todo, assignedTo) {
    todo.setProperties({
      assignedTo,
      assignedBy: assignedTo ? this.auth.get('user.employee') : null,
      assignedOn: new Date()
    });

    this.data.saveRecord(this.model);
  }
}
