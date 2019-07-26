import Controller from '@ember/controller';
import { A } from '@ember/array';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { htmlSafe } from '@ember/string';

export default Controller.extend(addEdit, {
  addedTodos:          A(),
  transitionAfterSave: 'account.action-item',
  transitionWithModel: true,
  modelIdentifier:     'slug',
  calendarLabel:       htmlSafe('<i class="clock icon"></i> Assign a Due Date'),

  _afterSave () {
    this.get('addedTodos').forEach(t => {
      t.destroy();
      this.get('model.checklist').removeObject(t);
    });
    this.set('addedTodos', A());
    this._super(...arguments);
  },

  actions: {
    updatePriority (newValue) {
      this.set('model.priority', newValue[0]);
    },

    addTodo () {
      const title = this.get('pendingTodo'),
            assignee = this.get('pendingTodoAssignee');

      let item = this.store.createRecord('checklist-item', { title });

      if (assignee) {
        item.setProperties({
          assignedTo: assignee,
          assignedBy: this.get('auth.user.employee'),
          assignedOn: new Date()
        });
      }

      this.get('model.checklist').addObject(item);
      this.get('addedTodos').addObject(item);

      this.setProperties({
        pendingTodo:         null,
        pendingTodoAssignee: null
      });
    },

    removeTodo (todo) {
      this.get('model.checklist').removeObject(todo);
      this.get('addedTodos').removeObject(todo);
      todo.destroy();
    }
  }
});
