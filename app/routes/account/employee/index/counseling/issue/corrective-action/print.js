import Ember from 'ember';

const { Route, run: { scheduleOnce, later, next } } = Ember;

let followThroughPath = 'account.employee.index.counseling.issue.corrective-action';

export default Route.extend({
  afterModel (model) {
    return model.get('employee.department');
  },

  actions: {
    didTransition () {
      next(() => scheduleOnce('afterRender', () => {
        window.print();
        later(() => this.transitionTo(followThroughPath), 100);
      }));
    }
  }
});
