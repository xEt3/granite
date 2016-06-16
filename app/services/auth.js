import Ember from 'ember';
import moment from 'moment';

const { Service, computed, $, RSVP: { Promise } } = Ember;

export default Service.extend({
  authUrl: '/api/login',

  authenticated: computed.and('token', 'didSetHeaders'),
  token: computed.reads('session.token'),
  userId: computed.reads('session.user'),

  /**
   * Login intent
   * @param  {String} email    User email
   * @param  {String} password User password
   * @return {Promise}         Resolves to session
   */
  login ( email, password ) {
    return $.post(this.get('authUrl'), { email, password })
    .done(response => {
      var session = this.store.createRecord('session', {
        token:   response.token,
        expires: response.expiration,
        user:    response.user
      });

      return session.save()
      .then(record => {
        this.set('session', record);
        this.get('currentUser');
        return record;
      });
    });
  },

  /**
   * Logout intent
   * @return {Promise} Resolves to destroyed session
   */
  logout () {
    if ( !this.get('session') ) {
      return Promise.resolve();
    }

    return this.get('session').destroyRecord();
  },

  /**
   * Initializes an existing session
   * @param  {Boolean} cleanup Cleans expirees as we get the session
   * @return {Promise}         Resolves to false or existing session
   */
  initializeExistingSession ( cleanup = true ) {
    return this.store.findAll('session').then(sessions => {
      var existingSession;

      sessions.forEach(session => {
        if ( moment(session.get('expires')).isAfter(moment()) ) {
          existingSession = session;
        } else if ( cleanup ) {
          session.destroyRecord();
        }
      });

      if ( existingSession ) {
        this.set('session', existingSession);
      }

      return existingSession || false;
    });
  },

  didSetHeaders: computed('token', function () {
    $.ajaxSetup({
      headers: {
        'X-API-Token': this.get('token')
      }
    });

    return true;
  }),

  user: computed('userId', function () {
    const userId = this.get('userId');

    if ( !userId || !this.get('authenticated') ) {
      return undefined;
    }

    return this.store.find('user', userId);
  })
});
