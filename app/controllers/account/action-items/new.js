import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { htmlSafe } from '@ember/string';

export default class AccountActionItemNewController extends Controller {
  @service data

  @tracked addedTodos = A()

  calendarLabel =       htmlSafe('<i class="clock icon"></i> Assign a Due Date')

  afterSaveOptions = {
    transitionAfterSave: 'account.action-item',
    transitionWithModel: true,
    modelIdentifier:     'slug'
  }


  @action
  afterSave () {
    this.addedTodos.forEach(t => {
      t.destroy();
      this.get('model.checklist').removeObject(t);
    });
    this.addedTodos = A();
  }

  @action
  updatePriority (newValue) {
    this.model.priority = newValue[0];
  }

  @action
  addTodo () {
    const title = this.pendingTodo,
          assignee = this.pendingTodoAssignee;

    let item = this.store.createRecord('checklist-item', { title });

    if (assignee) {
      item.setProperties({
        assignedTo: assignee,
        assignedBy: this.auth.get('user.employee'),
        assignedOn: new Date()
      });
    }

    this.model.checklist.addObject(item);
    this.addedTodos.addObject(item);

    this.setProperties({
      pendingTodo:         null,
      pendingTodoAssignee: null
    });
  }

  @action
  removeTodo (todo) {
    this.model.checklist.removeObject(todo);
    this.addedTodos.removeObject(todo);
    todo.destroy();
  }
}
