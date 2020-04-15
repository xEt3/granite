import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('menu__container-responsive')
export default class UiMenu extends Component {
  open = false;

  @action
  toggleMenu () {
    this.toggleProperty('open');
  }
}
