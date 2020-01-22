import Controller from '@ember/controller';
import { A } from '@ember/array';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  itemsInCart: A(),

  addToCart (webinar, e) {
    e.preventDefault();
    this.itemsInCart.addObject(webinar);
  }
});
