import Ember from 'ember';

const { Component } = Ember;

let ActionItemParticipantComponent = Component.extend({
  tagName: ''
});

ActionItemParticipantComponent.reopenClass({
  positionalParams: [ 'participant', 'actionItemOwner']
});

export default ActionItemParticipantComponent;
