import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import { inject as service } from '@ember/service';
import { A } from '@ember/array';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  auth:            service(),
  queryParams:     [ 'filter', 'isDsc' ],
  priorityFilters: [ 'lowest', 'low', 'medium', 'high', 'highest' ],
  priorityColors:  [ '', 'grey', 'teal', 'red', 'orange' ],
  filter:          A(),
  expandFiltered:  false,
  index:           null,
  isDsc:           false,
  enableNotify:    true,

  actions: {
    toggleSubscription (actionItem) {
      Promise.resolve(this.get('auth.user.employee'))
      .then(employee => {
        let subscribers = actionItem.get('subscribers'),
            arrayMethod = subscribers.includes(employee) ? 'removeObject' : 'addObject';

        subscribers[arrayMethod](employee);

        this.ajaxStart();
        return actionItem.save().then(() => {
          let verb = arrayMethod === 'addObject' ? 'subscribed' : 'unsubscribed';
          this.ajaxSuccess(`Successfully ${verb}`);
        });
      })
      .catch(this.ajaxError.bind(this));
    },

    changeFilter (index) {
      let indexPlusOne = index + 1,
          filter = this.get('filter');

      if (filter.includes(indexPlusOne)) {
        filter.removeObject(indexPlusOne);
      } else {
        filter.addObject(indexPlusOne);
      }
    }
  }
});
