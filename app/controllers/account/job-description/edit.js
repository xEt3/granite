import Controller from '@ember/controller';
import { computed } from '@ember/object';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { jobCategories } from 'granite/config/statics';


export default Controller.extend(addEdit, {
  jobCategories,
  transitionWithModel: true,
  transitionAfterSave: 'account.job-description',

  form: computed(() => [{
    label:      'Job Title',
    labelClass: 'sr-only',
    inputClass: 'large',
    type:       'text',
    path:       'title'
  }, {
    label: 'Job Description',
    type:  'textarea',
    path:  'description'
  }, {
    label:       'Category',
    type:        'select',
    inputClass:  'search',
    path:        'category',
    contentPath: 'controller.jobCategories'
  }, {
    label:       'Department',
    type:        'select',
    inputClass:  'search',
    path:        'department',
    contentPath: 'controller.departments',
    displayKey:  'name'
  }, {
    label:       'Equipment',
    type:        'select',
    inputClass:  'search multiple',
    path:        'assets',
    contentPath: 'controller.assets',
    displayKey:  'name'
  }])
});
