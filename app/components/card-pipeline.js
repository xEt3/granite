import Ember from 'ember';

const { Component } = Ember;

const CardPipelineComponent = Component.extend({
  classNames: [ 'pipeline' ]
});

CardPipelineComponent.reopenClass({
  positionalParams: [ 'candidates' ]
});

export default CardPipelineComponent;
