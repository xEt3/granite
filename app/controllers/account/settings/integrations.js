import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

const { Controller, inject } = Ember;

export default Controller.extend(ajaxStatus, {
  ajax: inject.service(),

  actions: {
    onNotify () {
      this.send.apply(this, [ 'notify', ...arguments ]);
    },

    grant ( data ) {
      this.ajaxStart();

      this.get('ajax').request('/api/v1/integrations/grant/' + data.id, {
        method: 'POST',
        data: {
          grant: data.grant
        }
      })
      .then(() => {
        this.ajaxSuccess('Successfully linked service.');
        this.send('refresh');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
