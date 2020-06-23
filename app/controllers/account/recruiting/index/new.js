import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class NewCampaignController extends Controller {
  @service data

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
      path:  'defaultName'
    }];
  }

  @action
  async save () {
    this.model.name = this.model.defaultName;
    await this.data.saveRecord(this.model, 'savingCampaign', {
      transitionWithModel: true,
      transitionAfterSave: 'account.job-opening'
    });
  }
}
