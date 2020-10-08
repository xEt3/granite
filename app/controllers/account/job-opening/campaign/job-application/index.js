import Controller from '@ember/controller';
import { filter } from '@ember/object/computed';
import { A } from '@ember/array';
import moment from 'moment';
import modalSupport from 'granite/core/modal-support';

@modalSupport
export default class JobApplicationController extends Controller {
  responsesModalId = 'modal__ja-responses'
  coverLetterModalId = 'modal__ja-cover-letter'

  @filter('events', (event) => moment().isBefore(event.get('start'))) upcomingEvents
  @filter('events', (event) => moment().isAfter(event.get('start'))) pastEvents

  get coverLetterTitle () {
    return `Cover letter from ${this.model.get('person.firstName')}`;
  }

  get responses () {
    const responses = this.get('model.responses') || A(),
          steps = this.get('screening.elements');

    return steps && responses ? steps.toArray().map(step => ({
      step,
      response: responses.findBy('step', step.get('id')),
      date:     typeof this.response.value === 'array' ? this.response.value.text && moment(this.response.value.text).isValid() : this.response.value && moment(this.response.value).isValid()

    })) : false;
  }
}
