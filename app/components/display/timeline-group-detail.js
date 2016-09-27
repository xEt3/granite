import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: [ 'history-timeline__detail', 'clearfix' ],

  actions: {
    deselectGroup () {
      this.get('onDeselect')();
    }
  }
});
