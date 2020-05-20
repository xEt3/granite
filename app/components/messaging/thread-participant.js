import Component from '@glimmer/component';

export default class MessagingThreadParticipantComponent extends Component {
  get online () {
    return this.args.connectedUsers.includes(this.args.participant.id);
  }

  get detail () {
    return this.online ? 'Online' : 'Offline';
  }
}
