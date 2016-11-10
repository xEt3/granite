import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('vogue');
  this.route('pricing');
  this.route('features');
  this.route('contact');

  this.route('about', function() {
    this.route('pricing');
  });

  this.route('signup', function() {
    this.route('billing');
    this.route('finish');
  });

  this.route('setup', function() {
    this.route('email-sent');
    this.route('set-password');
  });

  this.route('account', function() {
    this.route('index', { path: '/dashboard' });

    this.route('settings', function() {
      this.route('integrations');
    });

    this.route('employees', function() {
      this.route('add', function() {
        this.route('census');
        this.route('new');
      });
    });
    this.route('employee', { path: '/employee/:id' }, function() {
      this.route('index', { path: '/' }, function() {
        this.route('index', { path: '' });
        this.route('equipment');
        this.route('job');
        this.route('history');
        this.route('history-report');
        this.route('future-changes');
        this.route('edit', function() {
          this.route('index', { path: '/personal' });
          this.route('job');
          this.route('custom-fields');
        });
        this.route('edit-picture');
      });
      this.route('onboard', function() {
        this.route('index', { path: '/start' });
        this.route('job-information');
        this.route('equipment');
        this.route('custom-fields');
        this.route('picture');
      });
      this.route('onboard-complete');
    });
    this.route('action-items', function() {
      this.route('new');
    });
    this.route('documents');
    this.route('recruiting', function() {
      this.route('job-description', { path: '/job/:id' }, function() {
        this.route('settings');
      });
      this.route('new');
    });
    this.route('assets', function() {
      this.route('new');
    });
    this.route('asset', { path: '/asset/:id' }, function() {
      this.route('index', { path: '/stock' }, function() {
        this.route('new');
      });
      this.route('information');
      this.route('documents');
      this.route('settings');
      this.route('edit');
    });
    this.route('anatomy', function() {
      this.route('locations', function() {
        this.route('index', { path: '/' }, function() {
          this.route('new');
        });
      });
      this.route('location', function() {});
      this.route('departments', function() {
        this.route('index', { path: '/' }, function() {
          this.route('new');
        });
      });
      this.route('company-users', function() {
        this.route('new');
      });
    });
    this.route('action-item', { path: '/action-item/:slug' }, function() {
      this.route('todo');
      this.route('discussion');
      this.route('edit');
    });
  });

  this.route('error');
  this.route('not-found');
  this.route('unauthorized');
  this.route('catchall', {path: '/*wildcard'});
  this.route('login');
  this.route('setup-account', { path: '/setup/account/:userId' });
});

export default Router;
