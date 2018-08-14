import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  ajax: service(),

  queryParams: [ 'i', 'g', 's', 'f' ],

  i: null, // intent token
  g: null, // granted service token (success)
  s: null, // service name
  f: null, // failure bool

  grant () {
    const { g, i, s } = this.getProperties('g', 'i', 's');

    if (!g || !i) {
      return;
    }

    this.ajaxStart();

    this.get('ajax').request('/api/v1/integrations/grant/' + i, {
      method: 'POST',
      data: {
        grant: g
      }
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
  },

  actions: {
    onNotify () {
      this.send.apply(this, [ 'notify', ...arguments ]);
    },

    clearFailure () {
      this.setProperties({
        s: null,
        f: null
      });
    }
  }
});
