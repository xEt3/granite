import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'nav',
  classNames: [ 'ui menu account__navigation' ],

  actions: {
    toggle: function() {
      Ember.$('.ui.sidebar').sidebar('toggle');
    }
  }
});
