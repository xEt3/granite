import Ember from 'ember';
import resource from 'granite/mixins/controller-abstractions/resource';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend(resource, {
  auth: service(),
  intros: computed(function () {
    return [{
      element: '.ui.segment.container',
      intro: 'The recruiting campaigns screen shows you all of your recruiting campaigns and allows you to manage active and past openings.',
      position: 'top'
    }, {
      element: '#add-job-opening',
      intro: 'You can use the add button to start recruiting campaigns when you\'ve added the appropriate job description.',
      position: 'top'
    }];
  })
});
