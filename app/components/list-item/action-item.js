import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ListItemActionItemComponent extends Component {
  @service auth
  @computed.reads('auth.user.employee.id') userId
  @computed.mapBy('args.actionItem.subscribers', 'id') subscriberIds

  get todosComplete () {
    let item = this.args.actionItem;
    return item.checklist.length > 0 && item.incompleteTodos.length === 0;
  }

  @action
  toggleSubscription () {
    this.args.onToggleSubscription(this.args.actionItem);
  }
}
