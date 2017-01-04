import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed, observer, run } = Ember;

export default Controller.extend(addEdit, {
  transitionWithModel: true,
  transitionAfterSave: 'account.job-opening',

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
  }]),

  jobDescriptionChanged: observer('model.job', function () {
    run.once(() => {
      let model = this.get('model'),
          jobTitle = model.get('job.title');

      if ( jobTitle && !model.get('name') ) {
        model.set('name', `${jobTitle} Recruiting Campaign`);
      }
    });
  })
});
