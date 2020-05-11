import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountSettingsIntegrationsController extends Controller {
  @service ajax
  @service data

  queryParams = [ 'i', 'g', 's', 'f' ]
  i = null; // intent token
  g = null; // granted service token (success)
  s = null; // service name
  f = null; // failure bool

  async grant () {
    const { g, i, s } = this;

    if (!g || !i) {
      return;
    }

    let { success, error } = this.data.createStatus();

    try {
      await this.ajax.request('/api/v1/integrations/grant/' + i, {
        method: 'POST',
        data:   { grant: g }
      });
      success(`Successfully linked ${s}.`);
      this.setProperties({
        g: null,
        i: null,
        s: null
      });

      this.send('refreshModel');
    } catch (e) {
      error(e);
    }
  }

  @action
  onNotify () {
    this.send.apply(this.data, [ 'notify', ...arguments ]);
  }

  @action
  clearFailure () {
    this.setProperties({
      s: null,
      f: null
    });
  }
}
