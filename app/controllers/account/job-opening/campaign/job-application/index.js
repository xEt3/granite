import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import moment from 'moment';
import modalSupport from 'granite/mixins/modal-support';

export default Controller.extend(modalSupport, {
  responsesModalId:   'modal__ja-responses',
  coverLetterModalId: 'modal__ja-cover-letter',

  upcomingEvents: computed.filter('events', function (event) {
    return moment().isBefore(event.get('start'));
  }),

  pastEvents: computed.filter('events', function (event) {
    return moment().isAfter(event.get('start'));
  }),

  coverLetterTitle: computed('model.person.firstName', function () {
    return `Cover letter from ${this.get('model.person.firstName')}`;
  }),

  responses: computed('model.responses.[]', 'screening.elements.[]', function () {
    const responses = this.get('model.responses') || A(),
          steps = this.get('screening.elements');

    return steps && responses ? steps.toArray().map(step => ({
      step,
      response: responses.findBy('step', step.get('id'))
    })) : false;
  })
});
