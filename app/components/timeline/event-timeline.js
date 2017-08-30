import Ember from 'ember';

const { Component } = Ember;

const EventTimelineComponent = Component.extend({
});

EventTimelineComponent.reopenClass({
  positionalParams: [ 'events' ]
});

export default EventTimelineComponent;
