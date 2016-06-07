import Ember from 'ember';

export default Ember.Controller.extend(Ember.Evented, {
  actions: {
    toggle: function(direction) {
      $('.ui.sidebar').sidebar('toggle');
    }
  }
});
