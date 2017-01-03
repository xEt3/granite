import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed } = Ember;

export default Controller.extend(addEdit, {
  transitionWithModel: true,
  transitionAfterSave: 'account.job-description',

  intros: computed(() => [{
    element: '',
    intro: '',
    position: 'top'
  }]),

  form: computed(() => [{
    //job description select
    label: 'Job Description',
    type: 'select',
    inputClass: 'search',
    path: 'job',
    contentPath: 'controller.descriptions',
    displayKey: 'title'
  }, {
    //campaign observe name
    label: 'Campaign Name',
    type: 'text',
    path: 'name'
  }])
});
