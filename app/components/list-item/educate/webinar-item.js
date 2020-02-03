import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import moment from 'moment';
import { inject as service } from '@ember/service';

export default class WebinarItemComponent extends Component {
  @service ajax
  @tracked
  readMore = false

  get timeRemaining () {
    return !!this.args.authorization && `${moment(this.args.authorization.expiration).diff(new Date(), 'days')}`;
  }

  get inCart () {
    return this.args.itemsInCart ? this.args.itemsInCart.findBy('id', (this.args.webinar || {}).id) : false;
  }
}
