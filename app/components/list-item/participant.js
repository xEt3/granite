import Component from '@ember/component';

let ParticipantComponent = Component.extend({ tagName: '' });

ParticipantComponent.reopenClass({ positionalParams: [ 'participant' ] });

export default ParticipantComponent;
