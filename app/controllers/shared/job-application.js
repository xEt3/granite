import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';
import { A } from '@ember/array';

@classic
export default class JobApplicationController extends Controller {
  @computed('model.{jobApplication.responses.[],screening.elements.[]}')
  get responses () {
    const responses = this.get('model.jobApplication.responses') || A(),
          steps = this.get('model.screening.elements');

    return steps && responses ? steps.toArray().map(step => ({
      step,
      response: responses.find(({ step: s }) => s === step._id)
    })) : false;
  }
}
