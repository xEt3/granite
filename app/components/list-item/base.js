import Ember from 'ember';

const { Component } = Ember;

let BaseLiComponent = Component.extend({});

BaseLiComponent.reopenClass({
  positionalParams: [ 'model' ]
});

export default BaseLiComponent;
