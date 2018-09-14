import AjaxService from 'ember-ajax/services/ajax';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default AjaxService.extend({
  auth: service(),

  headers: computed('auth.{authenticated,token}', {
    get () {
      let headers = {};
      const token = this.get('auth.token');

      if (this.get('auth.authenticated')) {
        headers['X-API-Token'] = token;
      }

      return headers;
    }
  })
});
