import Controller from '@ember/controller';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { inject as service } from '@ember/service';

export default class WebinarsIndexController extends Controller {
  @service data
  itemsInCart = A()

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
}
