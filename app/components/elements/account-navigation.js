import Component from '@glimmer/component';

export default class AccountNavigation extends Component {
  linkPrefix = 'account.';

  get _links () {
    return [ ...this.args.links ].map(link => {
      return Object.assign({}, link, { fullLink: this.linkPrefix + link.link });
    });
  }
}
