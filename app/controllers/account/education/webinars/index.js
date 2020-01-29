import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class WebinarsIndexController extends Controller {
  @service data
  @service transactions

  @tracked
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

  get cardLayoutClass () {
    const len = this.purchasedWebinars.length;

    if (len === 1) {
      return 'one';
    }

    if (len > 3 && !(len % 4)) {
      return 'four';
    }

    if (len > 1 && len < 7 && !(len % 2)) {
      return 'two';
    }

    if (!(len % 3)) {
      return 'three';
    }

    return 'four';
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
      webinarIds: this.itemsInCart.mapBy('id'),
      created:    new Date()
    });
    this.itemsInCart = A();
    // Transition to process
    this.transitionToRoute('account.education.webinars.purchase', { queryParams: { idempotencyKey } });
  }
}
