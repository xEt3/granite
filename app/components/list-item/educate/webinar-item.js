import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';

export default class WebinarItemComponent extends Component {
  @tracked
  readMore = false

  get timeRemaining () {
    return !!this.args.authorization && `${moment(this.args.authorization.expiration).diff(new Date(), 'days')}/90 days remaining`;
  }

  get inCart () {
    return this.args.itemsInCart ? this.args.itemsInCart.findBy('id', (this.args.webinar || {}).id) : false;
  }
}
