import Component from '@glimmer/component';

export default class StickyCartComponent extends Component {
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

  submitCart () {
    console.log('dunno...');
  }
}
