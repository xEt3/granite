import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';

export default Controller.extend({
  responses: computed('model.{jobApplication.responses.[],screening.elements.[]}', function () {
    const responses = this.get('model.jobApplication.responses') || A(),
          steps = this.get('model.screening.elements');

    return steps && responses ? steps.toArray().map(step => ({
      step,
      response: responses.find(({ step: s }) => s === step._id)
    })) : false;
  })
});
