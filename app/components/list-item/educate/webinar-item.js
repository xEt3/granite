// import {
//   computed
// } from '@ember/object';
import Component from '@ember/component';
import moment from 'moment';

export default class WebinarItemComponent extends Component {
  get timeRemaining () {
    return !!this.authorization && `${ moment(this.authorization.expiration).diff(new Date(), 'days')} days of 90 remaining`;
  }
}
