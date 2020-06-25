import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { lists } from 'granite/config/forms/lists';
import $ from 'jquery';

export default class ModalsAtsAddLabelComponent extends Component {
  @service auth
  @service store
  @service data

  @tracked currentLabel = null

  newLabelForm = lists.labels.elements

  @action
  resetCurrentLabel () {
    this.currentLabel = null;
  }

  @action
  randomColor () {
    let hex = '0123456789ABCDEF',
        color = '#';

    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * hex.length)];
    }

    return color;
  }

  @action
  async addLabel () {
    this.currentLabel = await this.store.createRecord('label', { color: this.randomColor() });
  }

  @action
  async saveLabel (label) {
    const company = await this.auth.get('user.company'),
          companyLabels = await company.labels,
          applicationLabels = await this.args.model.labels;

    //add label to company, save, then remove phony label
    companyLabels.addObject(label);
    await this.data.saveRecord(company);
    companyLabels.filterBy('id', null).invoke('destroyRecord');

    //add saved label to application labels array
    applicationLabels.addObject(companyLabels.find(l => l.id && l.text === label.text));

    //reset currentLabel so fields are blank to add another label
    this.resetCurrentLabel();
  }

  @action
  respond (response) {
    this.args.onResponse(response);

    if (!response && this.currentLabel) {
      //kill label record if cancelled
      this.currentLabel.destroyRecord();
    }

    this.resetCurrentLabel();

    $(`#${this.args.modalId}`).modal('hide');
  }
}
