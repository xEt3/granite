import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';

export default class JobDescriptionEditController extends Controller {
  jobCategories
  @service data

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
