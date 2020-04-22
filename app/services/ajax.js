import AjaxService from 'ember-ajax/services/ajax';
import { inject as service } from '@ember/service';

export default class _AjaxService extends AjaxService {
  @service auth;

  get headers () {
    let headers = {};
    const token = this.auth.token;

    if (this.auth.get('authenticated')) {
      headers['X-API-Token'] = token;
    }

    return headers;
  }
}
