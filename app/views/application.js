import Ember from 'ember';

const { Component, on, run } = Ember;

export default Component.extend({
  classNames: [ 'pusher', 'granite-application-container' ],

  moveApplicationTag: on('didInsertElement', function () {
    run.scheduleOnce('afterRender', () => this.$().insertBefore('.ember-view:first'));
  })
});
