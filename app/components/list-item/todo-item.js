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
    return `${this.get('elementId')}-modal`;
  }

  willDestroy() {
    $(`#${this.get('modalId')}`).remove();
    super.willDestroy(...arguments);
  }

  @action
  changeStatus() {
    this.get('onStatusChange')(this.get('todo'));
  }

  @action
  selectAssignee() {
    this.set('respondedAssignee', false);
    $(`#${this.get('modalId')}`).modal({
      detachable: true,
      onHidden:   () => {
        if (!this.get('respondedAssignee')) {
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
    this.get('onAssigneeChange')(this.get('todo'), assignee);
  }

  @action
  respondAssignee(assignee) {
    this.get(assignee !== false ? 'resolve' : 'reject')(assignee || null);
    this.set('respondedAssignee', true);
    $(`#${this.get('modalId')}`).modal('hide');
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
