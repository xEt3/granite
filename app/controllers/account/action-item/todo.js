import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { A, Controller, computed, inject } = Ember;

export default Controller.extend(addEdit, {
  auth: inject.service(),
  enableNotify: false,
  addingTodo: false,
  addedTodos: A(),

  _afterSave () {
    this.get('addedTodos').forEach(t => t.destroy());
    this.set('addedTodos', A());
    this._super(...arguments);
  },

  userTodos: computed('auth.user.employee.id', 'model.incompleteTodos.@each.assignedTo.id', function () {
    let checklist = this.get('model.incompleteTodos');
    return checklist ? checklist.filterBy('assignedTo.id', this.get('auth.user.employee.id')) : [];
  }),

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    },

    addTodo () {
      const title = this.get('pendingTodo'),
            assignee = this.get('pendingTodoAssignee');

      let item = this.store.createRecord('checklist-item', { title });

      if ( assignee ) {
        item.setProperties({
          assignedTo: assignee,
          assignedBy: this.get('auth.user.employee'),
          assignedOn: new Date()
        });
      }

      this.get('model.checklist').addObject(item);
      this.get('addedTodos').addObject(item);
      this.send('save');

      this.setProperties({
        pendingTodo: null,
        pendingTodoAssignee: null
      });
    },

    removeTodo ( todo ) {
      this.get('model.checklist').removeObject(todo);
      this.get('addedTodos').removeObject(todo);
      todo.destroy();
    },

    changeCompletedStatus ( todo ) {
      if ( !todo.get('completedOn') ) {
        todo.setProperties({
          completedBy: this.get('auth.user.employee'),
          completedOn: moment().toDate()
        });
      } else {
        todo.setProperties({
          completedBy: null,
          completedOn: null
        });
      }
      this.send('save');
    },

    changeAssignee ( todo, assignedTo ) {
      todo.setProperties({
        assignedTo,
        assignedBy: assignedTo ? this.get('auth.user.employee') : null,
        assignedOn: new Date()
      });

      this.send('save');
    }
  }
});