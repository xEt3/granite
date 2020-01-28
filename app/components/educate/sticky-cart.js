import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class StickyCartComponent extends Component {
  @tracked
  cartExpanded = false

  get expanded () {
    return !this.shouldHide && this.cartExpanded;
  }

  get wormholeTarget () {
    return document.querySelector('.ember-application');
  }

  get shouldHide () {
    return (this.args.items || []).length < 1;
  }

  get itemTotal () {
    return (this.args.items || []).reduce((tot, webinar) => {
      return tot + (webinar.price || 0);
    }, 0);
  }

  @action
  toggleCartExpansion () {
    this.cartExpanded = !this.cartExpanded;
  }
}
