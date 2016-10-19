import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller } = Ember;

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.action-item',
  transitionWithModel: true,

  actions: {
    updatePriority ( newValue ) {
      this.set('model.priority', newValue[0]);
    },

    addTodo () {
      const name = this.get('pendingTodo'),
            assignee = this.get('pendingTodoAssignee');

      let item = this.store.createRecord('checklist-item', { name });

      if ( assignee ) {
        item.setProperties({
          assignedTo: assignee,
          assignedBy: this.get('auth.user.employee'),
          assignedOn: new Date()
        });
      }

      this.get('model.checklist').addObject(item);

      this.setProperties({
        pendingTodo: null,
        pendingTodoAssignee: null
      });
    },

    removeTodo ( todo ) {
      this.get('model.checklist').removeObject(todo);
      todo.destroy();
    }
  }
});
