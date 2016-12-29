import Ember from 'ember';
const { run } = Ember;
export default Ember.Route.extend({
  afterModel (model) {
    model.setProperties({

    });
    model.save().then(() => {
      run.scheduleOnce('afterRender', () => {
        run.later(() => {
          this.transitionTo('account.employees');
        }, 3000);
      });
    });
  }
});
