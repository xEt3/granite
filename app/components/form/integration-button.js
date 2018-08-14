import Component from '@ember/component';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from '../../mixins/ajax-status';

export default Component.extend(ajaxStatus, {
  ajax: service(),
  tagName: 'button',
  type: 'button',
  apiUri: '/api/v1/integrations/intent/:service',
  service: '',
  disabled: computed.reads('working'),
  attributeBindings: [ 'type', 'disabled' ],
  classNames: [ 'ui', 'button' ],
  classNameBindings: [ 'working:loading', 'alreadyLinked:disabled' ],
  linkedServices: A(),

  click ( e ) {
    e.preventDefault();

    if (this.get('alreadyLinked')) {
      return;
    }

    this.send('initiateIntegrationIntent');
  },

  alreadyLinked: computed('linkedServices.[]', 'service', function () {
    return (this.get('linkedServices') || []).includes(this.get('service'));
  }),

  actions: {
    initiateIntegrationIntent () {
      this.ajaxStart();

      let integration = this.get('service'),
          apiUri = this.get('apiUri').replace(':service', integration);

      this.get('ajax').post(apiUri)
      .then(response => {
        this.ajaxSuccess(null, true);
        window.location = response.authUri;
      })
      .catch(this.ajaxError.bind(this));
    },

    notify () {
      this.get('onNotify').apply(null, arguments);
    }
  }
});
