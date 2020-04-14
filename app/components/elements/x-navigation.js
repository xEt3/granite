import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames, classNameBindings, tagName } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

@classic
@tagName('nav')
@classNames('ui menu nav__main', 'menu__container-responsive')
@classNameBindings('transparent:nav__main-transparent')
export default class XNavigation extends Component {
  @service
  auth;

  open = false;

  @action
  toggleMenu() {
    this.toggleProperty('open');
  }
}
