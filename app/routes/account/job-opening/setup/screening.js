import Route from '@ember/routing/route';
import { Promise } from 'rsvp';
import add from 'granite/mixins/route-abstractions/add';

export default Route.extend(add, {
  titleToken: 'Screening',
  modelName:  'form',

  model () {
    let jobOpening = this.modelFor('account.job-opening'),
        makeNew = this._super.bind(this); // "add" mixin's model hook

    // Attempt to find a form for the current job opening
    return this.store.query('form', {
      targetType: 'JobOpening',
      targetId:   jobOpening.get('id')
    })
    // Resolve the found form or otherwise make a new form
    .then(response => Promise.resolve(response.get('firstObject') || makeNew()))
    .then(form => {
      return {
        form,
        jobOpening
      };
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.jobOpening,
      form:  model.form
    });
  }
});
