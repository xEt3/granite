import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import $ from 'jquery';

export default class AccountEmployeeIssueCorrectiveActionController extends Controller {
  @service auth
  @service data

  @tracked followup
  @tracked respondedFollowup

  deleteOptions = {
    transitionAfterDelete: 'account.employee.index.counseling.issue',
    transitionWithModel:   false
  }

  saveOptions = {
    transitionAfterSave: false,
    transitionWithModel: false
  }

  followupForm = [{
    label: 'Is the issue resolved?',
    type:  'checkbox',
    path:  'didResolve'
  }, {
    label:       'Followup notes',
    type:        'textarea',
    rows:        '7',
    path:        'notes',
    placeholder: 'Your notes about this follow up go here.'
  }, {
    label:      'When did you follow up?',
    type:       'date',
    path:       'created',
    inputAttrs: { inline: true }
  }, {
    label:      'Next follow up date (optional)',
    type:       'date',
    path:       'nextFollowup',
    inputAttrs: { inline: true }
  }]

  @action
  afterSave () {
    let followUps = this.model.followUps,
        removeDuplicates = [];

    followUps.forEach(f => {
      if (!f.id) {
        f.destroy();
        removeDuplicates.push(f);
      }
    });
    followUps.removeObjects(removeDuplicates);
  }

  @action
  createFollowup () {
    if (this.followup) {
      this.followup.destroyRecord();
    }

    let followup = this.store.createRecord('corrective-action-followup', { creator: this.auth.get('user.employee') });

    this.followup = followup;
    return followup;
  }

  @action
  async saveFollowup () {
    let followup = this.followup,
        correctiveAction = this.model;

    if (!followup) {
      return;
    }

    if (followup.didResolve) {
      correctiveAction.didResolve =         true;
      correctiveAction.resolutionStatusOn = new Date();
      correctiveAction.followUpOn =         followup.nextFollowup || correctiveAction.followUpOn;
    }

    correctiveAction.followUps.addObject(followup);
    await this.data.saveRecord(this.model, 'working', this.saveOptions);
    this.followup = null;
  }

  @action
  openFollowupModal () {
    this.respondedFollowup = false;
    this.createFollowup();

    $('#modal__corrective-action--followup').modal({
      detachable: true,
      onHidden:   () => {
        if (!this.respondedFollowup) {
          this.respondFollowup(false);

        }
      }
    }).modal('show');

    return new Promise((resolveFollowup, rejectFollowup) => {
      this.resolveFollowup = resolveFollowup;
      this.rejectFollowup = rejectFollowup;
    });
  }

  @action
  respondFollowup (response) {
    this[response ? 'resolveFollowup' : 'rejectFollowup'](response ? this.followup : null);
    this.respondedFollowup = true;
    $('#modal__corrective-action--followup').modal('hide');
  }

  @action
  saveDocument () {
    this.model.documents.addObjects(this.model.file);
    return this.data.saveRecord(this.model, 'working', this.saveOptions);
  }
}
