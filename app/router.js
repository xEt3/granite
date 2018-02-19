import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
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
      this.route('index', { path: '/general' }, function() {
        this.route('processes');
      });
      this.route('billing');
      this.route('integrations');
      this.route('templates', function() {
        this.route('edit', { path: '/:template_id/edit' });
        this.route('add', { path: '/:template_key' });
      });
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
        this.route('history');
        this.route('history-report');
        this.route('future-changes');
        this.route('counseling', function() {
          this.route('new');
          this.route('issue', { path: '/issue/:issue_slug' }, function() {
            this.route('new');
            this.route('corrective-action', { path: '/corrective-action/:action_id' }, function() {
              this.route('edit');
              this.route('print');
            });
          });
        });

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
      this.route('offboard', function() {
        this.route('index', { path: '/start' });
        this.route('details');
        this.route('options');
        this.route('assets');
        this.route('reorganization');
      });
      this.route('complete-offboarding');
    });
    this.route('action-items', function() {
      this.route('new');
    });
    this.route('documents', function() {
      this.route('intro');
      this.route('new');
    });
    this.route('job-description', { path: '/recruiting/job/:id' }, function() {
      this.route('settings');
    });
    this.route('recruiting', function() {
      this.route('settings');
      this.route('new');
      this.route('job-descriptions', function() {
        this.route('new');
      });

      this.route('index', { path: 'campaigns' }, function() {
        this.route('new');
      });
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
    this.route('document', { path: '/document/:id' });

    this.route('job-opening', { path: '/recruiting/job-opening/:id' }, function() {
      this.route('campaign', { path: '/' }, function() {
        this.route('settings');
        this.route('applicant-tracking');
        this.route(
          'job-application',
          { path: '/application/:application_id/view' },
          function() {
            this.route('event', { path: '/event/:event_id' });
          }
        );
      });
      this.route('setup', function() {
        this.route('settings');
        this.route('screening');
        this.route('sources');
        this.route('eeo');
        this.route('finish');
      });
      this.route('setup-complete');
    });
  });

  // Waiting for https://github.com/emberjs/ember.js/issues/14650 to be resolved
  this.route('error-page', { path: '/whoops' });
  this.route('not-found');
  this.route('unauthorized');
  this.route('catchall', {path: '/*wildcard'});
  this.route('login');
  this.route('setup-account', { path: '/setup/account/:user_id' });
});

export default Router;
