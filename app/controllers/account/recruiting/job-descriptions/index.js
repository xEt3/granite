import Ember from 'ember';
import resource from 'granite/mixins/controller-abstractions/resource';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend(resource, {
  auth: service(),
  intros: computed(function () {
    return [{
      element: '.ui.segment.container',
      intro: 'The job description page shows you all of your job descriptions. Job descriptions can be assigned to employees and are used to start recruiting campaigns.',
      position: 'top'
    }, {
      element: '#add-job-description',
      intro: 'You can use the add button to add job descriptions.',
      position: 'top'
    }];
  })
});
