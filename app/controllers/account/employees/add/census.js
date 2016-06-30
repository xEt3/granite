import Ember from 'ember';

export default Ember.Controller.extend({

  actions: {
    errorHandler: function () {
      console.log('Bubbling Failure');
    },
    successHandler: function () {
      console.log('Bubbling Success');
    }
  }
});
