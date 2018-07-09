import Component from '@ember/component';
import { computed } from '@ember/object';

const FirstStepsComponent = Component.extend({
  classNames: [ 'column' ],

  linkClass: computed('completed', function () {
    return `ui segment raised link card first-steps__card ${this.get('completed') ? 'first-steps__card--completed' : ''}`;
  })
});

FirstStepsComponent.reopenClass({
  positionalParams: [ 'step' ]
});

export default FirstStepsComponent;
