import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { A } from '@ember/array';

@classic
@classNames('pipeline__stage')
class PipelineStageComponent extends Component {
  @computed('activeCandidates.@each.{stageOrder,stage}', 'stage._id')
  get candidates() {
    const stageId = this.get('stage._id');
    return A([ stageId, ...(this.get('activeCandidates') || []).filter(candidate => stageId === candidate.get('stage')).sortBy('stageOrder') ]);
  }
}

PipelineStageComponent.reopenClass({ positionalParams: [ 'stage', 'stages' ] });

export default PipelineStageComponent;
