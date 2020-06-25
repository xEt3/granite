import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { Promise } from 'rsvp';
import $ from 'jquery';

export default class AccountEmployeeEditController extends Controller {
  @service data

  @tracked responded

  saveOptions = {
    transitionAfterSave: 'account.employee.index',
    transitionWithModel: true
  }

  get relationshipsChanged () {
    const initialRelationships = this.initialRelationships;
    for (let i = 0; i < initialRelationships.length; i++) {
      if (this.get(`model.${initialRelationships[i].relationshipPath}.id`) !== initialRelationships[i].id) {
        return true;
      }
    }
    return false;
  }

  @action
  selectEffectiveDate () {
    this.responded = false;

    $('#effective-date-modal').modal({
      detachable: true,
      onHidden:   () => {
        if (!this.responded) {
          this.respondEffectiveDateModal(false);
        }
      }
    }).modal('show');

    return new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
  }

  @action
  respondEffectiveDateModal (response) {
    this[response ? 'resolve' : 'reject']();
    this.responded = true;
    $('#effective-date-modal').modal('hide');
  }
}
