import Controller from 'granite/core/controller';
import { computed, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import $ from 'jquery';
import moment from 'moment';

export default class AccountEmployeeIndexIndexController extends Controller {
  @service ajax
  @service data

  @tracked editing = false

  @computed.or('model.{hireDate,dateOfBirth}') hasAnniversaries
  @computed.or('model.{phone,email}') hasDirectContact
  @computed.or('model.{emergencyContactPhone,emergencyContactNameFirst,emergencyContactNameLast}') hasEmergencyContact

  get customFieldsExist () {
    let cf = this.model.customFields;
    return cf ? Object.keys(cf).length : 0;
  }

  get onProbation () {
    return this.model.probationUntil && moment(this.model.probationUntil).isAfter(moment());
  }

  @action
  async forceSync () {
    let { success, error } = this.data.createStatus();

    try {
      let mod = await this.ajax.post(`/api/v1/integrations/${this.model.externalLinkService}/force-sync`, {
        data: {
          modelName: 'employees',
          recordId:  this.model.id
        }
      });

      success(mod.modifiedProps.length >= 1 ? 'Successfully Synced Record: ' + mod.modifiedProps.length + ' Changes' : 'Successfully Synced Record: No Changes');
      this.send('refreshModel');
    } catch (e) {
      error(e);
    }
  }

  @action
  beginEditing () {
    this.editing = true;
  }

  @action
  editValue (key, newValue) {
    let model = this.model;
    model.customFields[key] = newValue;
    this.data.saveRecord(this.model);
  }

  @action
  deleteCustomField (key) {
    let model = this.model,
        customFields = model.customFields;

    delete customFields[key];

    model.customFields = customFields;
    this.data.saveRecord(this.model);
  }

  @action
  openNotesModal () {
    $('#modal__notes').modal({ detachable: true }).modal('show');
  }
}
