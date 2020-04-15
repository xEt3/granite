import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';

@classic
export default class IntegrationsController extends Controller.extend(ajaxStatus) {
  @service
  ajax;

  queryParams = [ 'i', 'g', 's', 'f' ];
  i = null; // intent token
  g = null; // granted service token (success)
  s = null; // service name
  f = null; // failure bool

  grant() {
    const { g, i, s } = this;

    if (!g || !i) {
      return;
    }

    this.ajaxStart();

    this.ajax.request('/api/v1/integrations/grant/' + i, {
      method: 'POST',
      data:   { grant: g }
    })
    .then(() => {
      this.ajaxSuccess(`Successfully linked ${s}.`);
      this.setProperties({
        g: null,
        i: null,
        s: null
      });
      this.send('refresh');
    })
    .catch(this.ajaxError.bind(this));
  }

  @action
  onNotify() {
    this.send.apply(this, [ 'notify', ...arguments ]);
  }

  @action
  clearFailure() {
    this.setProperties({
      s: null,
      f: null
    });
  }
}
