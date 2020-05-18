import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { jobCategories } from 'granite/config/statics';

export default class NewJobDescriptionController extends Controller {
  @service data
  jobCategories = jobCategories

  get intros () {
    return [{
      element:  '#job-description',
      intro:    'Type your job description here. Descriptions are used throughout the hiring and employment process.',
      position: 'top'
    }, {
      element:  '#job-category',
      intro:    'A job category controls where your job would be posted in job boards if you hire for this description. This category can also be used for reporting.',
      position: 'top'
    }, {
      element:  '#job-equipment',
      intro:    'The equipment field allows Granite to suggest adding assets for the specified category whenever you onboard a new employee for this description. For example, if you select "Company Vehicles", Granite will suggest you add a company vehicle to any employee hired under this job description.',
      position: 'top'
    }];
  }

  get form () {
    return [{
      label:      'Job Title',
      labelClass: 'sr-only',
      inputClass: 'large',
      type:       'text',
      path:       'title'
    }, {
      label: 'Job Description',
      type:  'richtext',
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
    }];
  }
}
