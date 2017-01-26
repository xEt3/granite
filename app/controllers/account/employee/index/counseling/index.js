import Ember from 'ember';
import resource from 'granite/mixins/controller-abstractions/resource';

const { Controller, computed, inject: { service } } = Ember;

export default Controller.extend(resource, {
  auth: service(),
  intros: computed(function () {
    return [{
      element: '.ui.segment.container',
      intro: 'This page displays overarching categories of disciplinary issues for this employee.',
      position: 'top'
    }, {
      element: '#add-issue',
      intro: 'To start an issue file on this employee\'s record, press the plus button. Adding an issue will allow you to file corrective actions for the issue.',
      position: 'top'
    }];
  })
});
