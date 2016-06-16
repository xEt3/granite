import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
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
    this.route('employees', function() {
      this.route('add', function() {
        this.route('census');
        this.route('new');
      });
    });
    this.route('employee');
    this.route('action-items');
    this.route('documents');
    this.route('recruiting');
  });

  this.route('error');
  this.route('not-found');
  this.route('unauthorized');
  this.route('catchall', {path: '/*wildcard'});
  this.route('login');
});

export default Router;
