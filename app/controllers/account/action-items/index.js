import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class AccountActionItemsController extends Controller {
  @service auth
  @service data

  queryParams =     [ 'filter', 'isDsc' ]
  priorityFilters = [ 'lowest', 'low', 'medium', 'high', 'highest' ]
  priorityColors =  [ '', 'grey', 'teal', 'red', 'orange' ]
  filter =          A()
  expandFiltered =  false
  index =           null
  isDsc =           false

  @action
  async toggleSubscription (actionItem) {
    let employee = await this.auth.get('user.employee'),
        subscribers = actionItem.subscribers,
        arrayMethod = subscribers.includes(employee) ? 'removeObject' : 'addObject';

    subscribers[arrayMethod](employee);

    let { success, error } = this.data.createStatus();
    try {
      await actionItem.save();
      let verb = arrayMethod === 'addObject' ? 'subscribed' : 'unsubscribed';
      success(`Successfully ${verb}`);
    } catch (e) {
      error(e);
    }
  }

  @action
  changeFilter (index) {
    let indexPlusOne = index + 1,
        filter = this.filter;

    if (filter.includes(indexPlusOne)) {
      filter.removeObject(indexPlusOne);
    } else {
      filter.addObject(indexPlusOne);
    }
  }
}
