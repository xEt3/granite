import { Route, authenticated } from 'granite/core';
import { action } from '@ember/object';
import $ from 'jquery';

@authenticated
export default class AccountRoute extends Route {
  title (tokens) {
    return tokens.join(' - ') + ' - Granite HR';
  }

  @action
  willTransition () {
    $('.account__sidebar').sidebar('hide');
  }
}
