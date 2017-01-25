import Ember from 'ember';
import moment from 'moment';
import BaseLiComponent from './base';

const { computed } = Ember;

export default BaseLiComponent.extend({
  classNames: [ 'content' ],

  hiring: computed('model.{completedSetup,startOn,endOn}', function () {
    let now = moment(),
        model = this.get('model');
    if (this.get('completedSetup') && now.isBefore(model.endOn) && now.isAfter(model.startOn)) {
      return true;
    } else {
      return false;
    }

    // completedSetup is truthy
    // startOn is defined, it's before today
    // is endOn is defined, it's after today
  }),

  hired: computed('hiring', 'model.{endOn}', function () {

  })
});
