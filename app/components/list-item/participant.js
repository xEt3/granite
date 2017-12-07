import Ember from 'ember';

const { Component } = Ember;

let ParticipantComponent = Component.extend({
  tagName: ''
});

ParticipantComponent.reopenClass({
  positionalParams: [ 'participant' ]
});

export default ParticipantComponent;
