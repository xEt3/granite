import Component from '@glimmer/component';
import { A } from '@ember/array';

export default class CardPipelineStageComponent extends Component {
  get candidates () {
    const stageId = this.args.stage._id;
    return A([ stageId, ...(this.args.activeCandidates || []).filter(candidate => stageId === candidate.stage).sortBy('stageOrder') ]);
  }
}

/*
  USAGE:

  <CardPipeline::StageColumn
    @stage={{stage}}
    @stages={{@pipeline.stages}}
    @newScheduledMeeting={{@newScheduledMeeting}}
    @activeCandidates={{@candidates}}
    @dispatchReorder={{this.setOrder}}
    @moveAppToStage={{this.moveAppToStage}}
    @onDisqualify={{@onDisqualify}}
    @onUnDisqualify={{@onUnDisqualify}}
    @onUnHire={{@onUnHire}}
    @onSchedule={{@onSchedule}}
    @disableDragging={{this.data.statuses.working.isLoading}}
    @onLinkSharing={{@onLinkSharing}}
    @onOnboardCandidate={{@onOnboardCandidate}}
    @onAddLabel={{@onAddLabel}} />

*/
