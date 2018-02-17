import Component from '@ember/component';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';
import $ from 'jquery';

let TodoItemComponent = Component.extend({
  classNames: [ 'item', 'action-item__checklist--item' ],

  modalId: computed('elementId', function () {
    return `${this.get('elementId')}-modal`;
  }),

  willDestroy () {
    $(`#${this.get('modalId')}`).remove();
    this._super(...arguments);
  },

  actions: {
    changeStatus() {
      this.get('onStatusChange')( this.get('todo') );
    },

    selectAssignee () {
      this.set('respondedAssignee', false);
      $(`#${this.get('modalId')}`).modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('respondedAssignee') ) {
            this.send('respondAssignee', false);
          }
        }
      }).modal('show');

      return new Promise((resolve, reject) => this.setProperties({ resolve, reject }));
    },

    changeAssignee ( assignee ) {
      this.set('newAssignee', null);
      this.get('onAssigneeChange')(this.get('todo'), assignee);
    },

    respondAssignee ( assignee ) {
      this.get(assignee !== false ? 'resolve' : 'reject')(assignee || null);
      this.set('respondedAssignee', true);
      $(`#${this.get('modalId')}`).modal('hide');
    }
  }
});

TodoItemComponent.reopenClass({
  positionalParams: [ 'todo' ]
});

export default TodoItemComponent;

/* Usage
  {{list-item/todo-item todo
    onStatusChange=(action 'changeStatus')
    onAssigneeChange=(action 'changeAssignee')
    assignableTo=employees
  }}
*/
