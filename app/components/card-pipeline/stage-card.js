import Component from '@glimmer/component';
import Ember from 'ember';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { task } from 'ember-concurrency';

const { Logger: { error } } = Ember;

export default class CardPipelineStageCardComponent extends Component {
  @service store

  @tracked meetingFetched = false

  get allExceptCurrentStage () {
    const stageId = this.args.application.stage;
    return (this.args.stages || []).filter(stage => stage._id !== stageId);
  }

  get nextMeeting () {
    if (!this.meetingFetched || this.args.newScheduledMeeting === this.args.application.id) {
      return this.getNextMeeting.perform();
    }
    return false;
  }

  get controlsDisabled () {
    return this.args.application.hired || this.args.application.disqualified;
  }

  @task(function*() {
    try {
      let results = yield this.store.query('event', {
        limit:       1,
        start:       { $gt: new Date() },
        sort:        { start: 1 },
        contextType: 'JobApplication',
        contextId:   this.args.application.id
      });

      this.meetingFetched = true;

      return (results || A()).firstObject;
    } catch (e) {
      error(e);
    }
  }) getNextMeeting

  @action
  moveTo (stage) {
    this.args.moveAppToStage(this.args.application, stage);
  }
}

/*
  USAGE:

  <CardPipeline::StageCard
    @application={{jobApp}}
    @stages={{@this.stages}}
    @newScheduledMeeting={{this.newScheduledMeeting}}
    @moveAppToStage={{@moveAppToStage}}
    @onUnDisqualify={{@onUnDisqualify}}
    @onDisqualify={{@onDisqualify}}
    @onUnHire={{@onUnHire}}
    @onOnboardCandidate={{@onOnboardCandidate}}
    @onLinkSharing={{@onLinkSharing}}
    @onSchedule={{@onSchedule}}
    @onAddLabel={{@onAddLabel}} />

*/
