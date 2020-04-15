import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import AjaxService from 'ember-ajax/services/ajax';

@classic
export default class _AjaxService extends AjaxService {
  @service
  auth;

  @computed('auth.{authenticated,token}')
  get headers () {
    let headers = {};
    const token = this.get('auth.token');

    if (this.get('auth.authenticated')) {
      headers['X-API-Token'] = token;
    }

    return headers;
  }
}
