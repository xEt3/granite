import Component from '@ember/component';
import { computed } from '@ember/object';

const ThreadParticipantComponent = Component.extend({
  tagName: 'span',
  classNames: ['ui', 'image', 'label' ],
  classNameBindings: ['online:green'],

  online: computed('connectedUsers.[]', 'participant', function () {
    return this.get('connectedUsers').includes(this.get('participant.id'));
  }),

  detail: computed('online', function () {
    return this.get('online') ? 'Online' : 'Offline';
  })
});

ThreadParticipantComponent.reopenClass({
  positionalParams: [ 'participant' ]
});

export default ThreadParticipantComponent;
