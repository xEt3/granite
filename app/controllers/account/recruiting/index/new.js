import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';

export default class NewCampaignController extends Controller {
  @service data

  // NOT WORKING
  get form () {
    return [{
      //job description select
      label:       'Job Description',
      type:        'select',
      inputClass:  'search',
      path:        'job',
      contentPath: 'controller.descriptions',
      displayKey:  'title'
    }, {
      label: 'Campaign Name',
      type:  'text',
      // path:  this.model.name ? 'name' : 'defaultName'
      path:  'name'
    }];
  }
}
