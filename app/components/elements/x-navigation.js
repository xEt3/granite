import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class XNavigation extends Component {
  @service auth;

  open = false;

  @action
  toggleMenu () {
    this.toggleProperty('open');
  }
}
