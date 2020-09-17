import Controller from 'granite/core/controller';
import { inject as controller } from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import breadcrumbOverrides from '../config/breadcrumb';

export default class AccountController extends Controller {
  breadcrumbOverrides = breadcrumbOverrides

  @service auth
  @controller() application

  @computed.reads('application.currentPath') currentPath

  @action
  logout () {
    this.auth.logout();
  }
}
