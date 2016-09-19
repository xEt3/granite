import Ember from 'ember';
import ajaxStatus from '../../mixins/ajax-status';

const { Component, A, inject, computed } = Ember;

export default Component.extend(ajaxStatus, {
  ajax: inject.service(),
  tagName: 'button',
  type: 'button',
  apiUri: '/api/v1/integrations/intent/:service',
  service: '',
  disabled: computed.reads('working'),
  attributeBindings: [ 'type', 'disabled' ],
  classNames: [ 'ui', 'button' ],
  classNameBindings: [ 'working:loading', 'alreadyLinked:disabled' ],
  linkedServices: A(),

  init () {
    this._super();
    this.setupListener();
  },

  willDestroyElement () {
    this.teardownListener();
  },

  click ( e ) {
    e.preventDefault();

    if ( this.get('alreadyLinked') ) {
      return;
    }

    this.send('initiateIntegrationIntent');
  },

  setupListener () {
    let messageHandler = this.messageReceived.bind(this);
    Ember.$(window).on('message', messageHandler);
  },

  teardownListener () {
    let messageHandler = this.messageReceived.bind(this);
    Ember.$(window).off('message', messageHandler);
  },

  messageReceived ( e ) {
    let eventData = e.originalEvent.data;

    if ( !eventData.name ) {
      return;
    }

    let messageData = {
      id: this.get('intent.id')
    };

    Ember.$('#' + this.get('modalId')).modal('hide');

    let eventHook = this['on' + eventData.name];

    if ( eventHook && typeof eventHook === 'function' ) {
      eventHook(Ember.$.extend(messageData, eventData ? eventData.data : {}));
    }
  },

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-integration-modal';
  }),

  alreadyLinked: computed('linkedServices.[]', 'service', function () {
    return this.get('linkedServices').includes(this.get('service'));
  }),

  actions: {
    initiateIntegrationIntent () {
      this.ajaxStart();

      let service = this.get('service'),
          apiUri = this.get('apiUri').replace(':service', service);

      this.get('ajax').post(apiUri)
      .then(response => {
        this.ajaxSuccess(null, true);
        this.set('intent', response);
        Ember.$('#' + this.get('modalId')).modal('show');
      })
      .catch(this.ajaxError.bind(this));
    },

    notify () {
      this.get('onNotify').apply(null, arguments);
    }
  }
});