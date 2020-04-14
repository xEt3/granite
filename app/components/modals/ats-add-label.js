import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { lists } from 'granite/config/forms/lists';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

@classic
class AddLabelModalComponent extends Component.extend(addEdit) {
  @service
  auth;

  @service
  store;

  enableNotify = false;
  currentLabel = null;
  newLabelForm = lists.labels.elements;

  resetCurrentLabel() {
    this.set('currentLabel', null);
  }

  randomColor() {
    let hex = '0123456789ABCDEF',
        color = '#';
    for (let i = 0; i < 6; i++) {
      color += hex[Math.floor(Math.random() * hex.length)];
    }
    return color;
  }

  @action
  async addLabel() {
    this.set('currentLabel', await this.store.createRecord('label', { color: this.randomColor() }));
  }

  @action
  async saveLabel(label) {
    let company = await this.get('auth.user.company'),
        companyLabels = await company.get('labels'),
        applicationLabels = await this.get('model.labels');

    //add label to company, save, then remove phony label
    companyLabels.addObject(label);
    await this.saveModel(company);
    companyLabels.filterBy('id', null).invoke('destroyRecord');

    //add saved label to application labels array
    let newSavedLabel = companyLabels.find(l => {
      return l.id && l.text === label.text;
    });

    applicationLabels.addObject(newSavedLabel);

    //reset currentLabel so fields are blank to add another label
    this.resetCurrentLabel();
  }

  @action
  respond(response) {
    this.get('onResponse')(response);

    if (!response && this.get('currentLabel')) {
      //kill label record if cancelled
      this.get('currentLabel').destroyRecord();
    }

    this.resetCurrentLabel();

    $(`#${this.get('modalId')}`).modal('hide');
  }
}

AddLabelModalComponent.reopenClass({ positionalParams: [ 'model' ] });

export default AddLabelModalComponent;
