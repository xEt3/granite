import Ember from 'ember';

const { computed, observer, get, set, setProperties } = Ember;

let ConfirmComponent = Ember.Component.extend({
  classNames: [ 'x-confirm__component' ],
  showModal: false,

  modalId: computed('elementId', function () {
    return this.get('elementId') + '__modal';
  }),

  _stateChanged: observer('_confirmState', function () {
    const state = get(this, '_confirmState'),
          modalId = get(this, 'modalId');

    let stateNotification = type => {
      return () => {
        let a = get(this, type);

        if ( a && typeof a === 'function' ) {
          a(state);
        }

        if ( type === 'confirmClosed' ) {
          get(this, '_confirmState.resolver')(get(this, '_intermediateState'));
          set(this, '_intermediateState', undefined);
        }
      };
    };

    setProperties(this, {
      isConfirm: undefined,
      isAlert: undefined
    });

    if ( state ) {
      set(this, 'showModal', true);
      set(this, 'is' + state.type, true);
      this.$('#' + modalId).one('shown.bs.modal', stateNotification('confirmOpen'));
      this.$('#' + modalId).one('hidden.bs.modal', stateNotification('confirmClosed'));
    }
  }),

  actions: {
    close ( response ) {
      set(this, 'showModal', false);
      set(this, '_intermediateState', response);
    }
  }
});

ConfirmComponent.reopenClass({
  positionalParams: [ '_confirmState' ]
});

export default ConfirmComponent;
