import Component from '@glimmer/component';
import { elementId } from 'granite/core';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { Promise } from 'rsvp';
import $ from 'jquery';

@elementId
export default class ListItemTodoItemComponent extends Component {
  @tracked newAssignee
  @tracked respondedAssignee

  get modalId () {
    return `${this.elementId}-modal`;
  }

  @action
  willDestroy () {
    $(`#${this.modalId}`).remove();
    super.willDestroy(...arguments);
  }

  @action
  selectAssignee () {
    this.respondedAssignee = false;
    $(`#${this.modalId}`).modal({
      detachable: true,
      onHidden:   () => {
        if (!this.respondedAssignee) {
          this.respondAssignee(false);
        }
      }
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({
      resolve,
      reject
    }));
  }

  @action
  changeAssignee (assignee) {
    this.newAssignee = null;
    this.args.onAssigneeChange(this.args.todo, assignee);
  }

  @action
  respondAssignee (assignee) {
    this[assignee !== false ? 'resolve' : 'reject'](assignee || null);
    this.respondedAssignee = true;
    $(`#${this.modalId}`).modal('hide');
  }
}


/* Usage
  <ListItem::TodoItem @todo={{todo}}
    @onStatusChange={{this.changeStatus}}
    @onAssigneeChange={{this.changeAssignee}}
    @assignableTo={{employees}}
  />
*/
