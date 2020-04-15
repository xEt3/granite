import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class AccountNavigation extends Component {
  linkPrefix = 'account.';

  @computed('links')
  get _links () {
    return [ ...this.links ].map(link => {
      return Object.assign({}, link, { fullLink: this.linkPrefix + link.link });
    });
  }
}
