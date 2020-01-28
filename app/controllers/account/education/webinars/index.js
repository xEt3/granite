import Controller from '@ember/controller';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class WebinarsIndexController extends Controller {
  @service data
  @service transactions

  itemsInCart = A()

  get purchasedWebinars () {
    return this.authorizations.map(auth => ({
      auth,
      webinar: this.webinars.findBy('id', auth.belongsTo('webinar').id())
    }));
  }

  get webinarsAvailableForPurchase () {
    return this.webinars.filter(webinar => !this.purchasedWebinars.find(g => g.webinar.id === webinar.id));
  }

  @action
  addToCart (webinar, e) {
    e.preventDefault();
    this.itemsInCart.addObject(webinar);
  }

  @action
  removeFromCart (webinar, e) {
    e.preventDefault();
    this.itemsInCart.removeObject(webinar);
  }

  @action
  checkout () {
    // Create the transaction intent
    const idempotencyKey = this.transactions.createIntent({
      type:       'webinarPurchase',
      webinarIds: this.itemsInCart.mapBy('id')
    });

    // Transition to process
    this.transitionToRoute('account.education.webinars.purchase', { queryParams: { idempotencyKey } });
  }
}
