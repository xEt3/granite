import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('vogue');
  this.route('signup', function() {
    this.route('billing');
    this.route('finish');
  });
  this.route('pricing');
  this.route('features');
  this.route('about', function() {
    this.route('pricing');
  });
  this.route('contact');
  this.route('setup', function() {
    this.route('email-sent');
    this.route('set-password');
  });
});

export default Router;
