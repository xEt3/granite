import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { Promise } from 'rsvp';
import $ from 'jquery';

@classic
@classNames('item', 'action-item__checklist--item')
class TodoItemComponent extends Component {
  @computed('elementId')
  get modalId() {
    return `${this.elementId}-modal`;
  }

  willDestroy() {
    $(`#${this.modalId}`).remove();
    super.willDestroy(...arguments);
  }

  @action
  changeStatus() {
    this.onStatusChange(this.todo);
  }

  @action
  selectAssignee() {
    this.set('respondedAssignee', false);
    $(`#${this.modalId}`).modal({
      detachable: true,
      onHidden:   () => {
        if (!this.respondedAssignee) {
          this.send('respondAssignee', false);
        }
      }
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({
      resolve,
      reject
    }));
  }

  @action
  changeAssignee(assignee) {
    this.set('newAssignee', null);
    this.onAssigneeChange(this.todo, assignee);
  }

  @action
  respondAssignee(assignee) {
    this.get(assignee !== false ? 'resolve' : 'reject')(assignee || null);
    this.set('respondedAssignee', true);
    $(`#${this.modalId}`).modal('hide');
  }
}

TodoItemComponent.reopenClass({ positionalParams: [ 'todo' ] });

export default TodoItemComponent;

/* Usage
  {{list-item/todo-item todo
    onStatusChange=(action 'changeStatus')
    onAssigneeChange=(action 'changeAssignee')
    assignableTo=employees
  }}
*/
