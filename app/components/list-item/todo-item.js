import Ember from 'ember';

const { Component } = Ember;

let TodoItemComponent = Component.extend({
  classNames: [ 'item', 'action-item__checklist--item' ],
  actions: {
    changeStatus() {
      this.get('onStatusChange')( this.get('todo') );
    }
  }
});

TodoItemComponent.reopenClass({
  positionalParams: [ 'todo' ]
});

export default TodoItemComponent;

/* Usage
<<<<<<< Updated upstream
  {{list-item/todo-item todo}}
=======
  {{list-item/todo-item todo onStatusChange=}}
>>>>>>> Stashed changes
*/
