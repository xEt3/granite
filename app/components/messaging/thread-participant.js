import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('span')
@classNames('ui', 'image', 'label')
@classNameBindings('online:green')
class ThreadParticipantComponent extends Component {
  @computed('connectedUsers.[]', 'participant')
  get online () {
    return this.connectedUsers.includes(this.get('participant.id'));
  }

  @computed('online')
  get detail () {
    return this.online ? 'Online' : 'Offline';
  }
}

ThreadParticipantComponent.reopenClass({ positionalParams: [ 'participant' ] });

export default ThreadParticipantComponent;
