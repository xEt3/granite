import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/string';
import $ from 'jquery';

export default class CompanyNavigationComponent extends Component {
  @service auth

  get logoUrl () {
    let img = this.auth.get('user.company.logoUrl') || '/assets/images/granite-logo-mountains.png';
    return htmlSafe(`background-image: url('${img}')`);
  }

  @action
  toggle () {
    $('.ui.sidebar').sidebar('toggle');
  }
}
