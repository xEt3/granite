import Ember from 'ember';
import Service from '@ember/service';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { on } from '@ember/object/evented';
import moment from 'moment';
import ENV from 'granite/config/environment';

const { Logger } = Ember;

export default Service.extend({
  authUrl:   '/api/v1/login/company-user',
  clock:     service(),
  store:     service(),
  ajax:      service(),
  analytics: service(),

  authenticated: computed.bool('token'),
  token:         computed.reads('session.token'),
  userId:        computed.reads('session.user'),

  initializeClock: on('init', function () {
    this.clock; // eslint-disable-line
  }),

  /**
   * Login intent
   * @param  {String} email    User email
   * @param  {String} password User password
   * @return {Promise}         Resolves to session
   */
  login (email, password) {
    let data = {
      email,
      password
    };
    Logger.debug('AS :: Requesting authentication service', this.authUrl);
    return this.ajax.post(this.authUrl, { data })
    .then(response => {
      Logger.debug('AS :: Got server response', response);
      var session = this.store.createRecord('session', {
        token:   response.token,
        expires: response.expires,
        user:    response.user,
        id:      response.id
      });

      this.analytics.identifyUser(response.user);
      this.analytics.trackEvent('Session', 'log in', 'Session Login');

      return ENV.environment === 'test' ? Promise.resolve(session) : session.save();
    })
    .then(record => {
      Logger.debug('AS :: Saved session record in localforage');
      this.set('session', record);
      this.currentUser; // eslint-disable-line
      return record;
    });
  },

  /**
   * Logout intent
   * @return {Promise} Resolves to destroyed session
   */
  logout () {
    Logger.debug('AS :: Logout');

    if (!this.session) {
      Logger.debug('AS :: No session available - skipping logout');
      return Promise.resolve();
    }

    this.analytics.trackEvent('Session', 'logout', 'Session Logout');

    Logger.debug('AS :: Destroying session');
    return this.session.destroyRecord()
    .then(() => {
      this.set('session', null);
    });
  },

  refreshSession () {
    if (!this.authenticated) {
      return Promise.resolve();
    }

    this.analytics.trackEvent('Session', 'refresh', 'Session Refreshed');

    return this.ajax.request('/api/v1/grant/' + this.get('session.id') + '/refresh', { method: 'POST' })
    .then(response => {
      let session = this.session;
      session.set('expires', response.expires);
      return session.save();
    });
  },

  /**
   * Initializes an existing session
   * @param  {Boolean} cleanup Cleans expirees as we get the session
   * @return {Promise}         Resolves to false or existing session
   */
  initializeExistingSession (cleanup = true) {
    Logger.debug('AS :: Initializing existing session');
    return this.store.findAll('session').then(sessions => {
      var existingSession;
      Logger.debug('AS :: Got local sessions');
      sessions.toArray().forEach(session => {
        if (moment(session.get('expires')).isAfter(moment())) {
          Logger.debug('AS :: Found active session');
          existingSession = session;
        } else if (cleanup) {
          session.destroyRecord();
        }
      });

      if (existingSession) {
        this.set('session', existingSession);
      }

      return existingSession ?
        this.user.then(user => user.get('employee')).then(() => existingSession)
        .catch(err => {
          if (((err || {}).errors || []).filter(e => e.status === '401').length > 0) {
            return this.logout();
          } else {
            throw err;
          }
        })
        : false;
    });
  },

  user: computed('userId', function () {
    const userId = this.userId;

    if (!userId || !this.authenticated) {
      return Promise.resolve();
    }

    return this.store.find('company-user', userId);
  }),

  isExpired: computed('clock.minute', 'session.expires', 'authenticated', function () {
    return this.authenticated && moment(this.get('session.expires')).isBefore(moment());
  }),

  isExpiring: computed('clock.minute', 'session.expires', function () {
    return this.authenticated && moment(this.get('session.expires')).subtract(10, 'minutes').isBefore(moment());
  })
});
