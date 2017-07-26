import Ember from 'ember';

const { Component, computed } = Ember;

const fromPercent = (n, max) => Math.round(n / 100 * max);

const calcColorComponent = Component.extend({
  tagName: '',
  scale: 255,
  mixes: computed('value', 'scale', function () {
    const scale = this.get('scale'),
          val = this.get('value');

    return {
      low: fromPercent(100 - val, scale),
      high: fromPercent(val, scale)
    };
  })
});

calcColorComponent.reopenClass({
  positionalParams: [ 'value' ]
});

export default calcColorComponent;
