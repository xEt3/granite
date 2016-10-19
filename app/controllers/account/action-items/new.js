import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, A } = Ember;

export default Controller.extend(addEdit, {
  addedTodos: A(),
  transitionAfterSave: 'account.action-item',
  transitionWithModel: true,

  _afterSave () {
    this.get('addedTodos').forEach(t => t.destroy()).empty();
    this._super(...arguments);
  },

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
      this.get('addedTodos').addObject(item);

      this.setProperties({
        pendingTodo: null,
        pendingTodoAssignee: null
      });
    },

    removeTodo ( todo ) {
      this.get('model.checklist').removeObject(todo);
      this.get('addedTodos').removeObject(todo);
      todo.destroy();
    }
  }
});
