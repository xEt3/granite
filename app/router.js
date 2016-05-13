import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('vogue');
  this.route('signup', function() {
    this.route('billing');
    this.route('information');
  });
});

export default Router;
