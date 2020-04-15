import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import $ from 'jquery';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

@classic
export default class SourcesController extends Controller.extend(addEdit) {
  mutSelect(type, source) {
    let selected = this.get(`model.${type}`);

    if (selected.includes(source)) {
      selected.removeObject(source);
    } else {
      selected.pushObject(source);
    }
  }

  @action
  mutSelection(source) {
    this.mutSelect('applicantSources', source);
  }

  @action
  mutManualSelection(source) {
    this.mutSelect('manualApplicantSources', source);
  }

  @action
  addToSelection(source) {
    this.get('model.manualApplicantSources').addObject(source);
  }

  @action
  addManualSource() {
    this.setProperties({
      manualSource:          this.store.createRecord('manual-applicant-source'),
      respondedManualSource: false
    });

    $('#modal__add--manual-source').modal({
      detachable: true,
      onHidden:   () => {
        if (!this.respondedManualSource) {
          this.send('respondManualSource', false);
        }
      }
    }).modal('show');

    return new Promise((resolveMs, rejectMs) => this.setProperties({
      resolveMs,
      rejectMs
    }));
  }

  @action
  respondManualSource(response) {
    if (!response) {
      this.manualSource.destroyRecord();
    }

    this.get(response ? 'resolveMs' : 'rejectMs')(response ? this.manualSource : null);
    this.set('respondedManualSource', true);
    $('#modal__add--manual-source').modal('hide');
  }
}
