import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { action } from '@ember/object';
import $ from 'jquery';

export default class AccountJobOpeningSetupSourcesController extends Controller {
  @service data

  @action
  mutSelect (type, source) {
    let selected = this.model[type];

    if (selected.includes(source)) {
      selected.removeObject(source);
    } else {
      selected.pushObject(source);
    }
  }

  @action
  mutSelection (source) {
    this.mutSelect('applicantSources', source);
  }

  @action
  mutManualSelection (source) {
    this.mutSelect('manualApplicantSources', source);
  }

  @action
  addToSelection (source) {
    this.model.manualApplicantSources.addObject(source);
  }

  @action
  addManualSource () {
    this.setProperties({
      manualSource:          this.store.createRecord('manual-applicant-source'),
      respondedManualSource: false
    });

    $('#modal__add--manual-source').modal({
      detachable: true,
      onHidden:   () => {
        if (!this.respondedManualSource) {
          this.respondManualSource(false);
        }
      }
    }).modal('show');

    return new Promise((resolveMs, rejectMs) => this.setProperties({
      resolveMs,
      rejectMs
    }));
  }

  @action
  respondManualSource (response) {
    if (!response) {
      this.manualSource.destroyRecord();
    }

    this[response ? 'resolveMs' : 'rejectMs'](response ? this.manualSource : null);
    // this.get(response ? 'resolveMs' : 'rejectMs')(response ? this.manualSource : null);
    this.respondedManualSource = true;
    $('#modal__add--manual-source').modal('hide');
  }
}
