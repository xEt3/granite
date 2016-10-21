import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

const { Controller, RSVP: { Promise }, inject } = Ember;

export default Controller.extend(ajaxStatus, {
  auth: inject.service(),
  enableNotify: true,

  actions: {
    toggleSubscription ( actionItem ) {
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
    }
  }
});
