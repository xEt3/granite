import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('')
class ParticipantComponent extends Component {}

ParticipantComponent.reopenClass({ positionalParams: [ 'participant' ] });

export default ParticipantComponent;
