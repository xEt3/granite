import Component from '@ember/component';

export default Component.extend({
  classNames: [ 'history-timeline__detail', 'clearfix' ],

  actions: {
    deselectGroup () {
      this.get('onDeselect')();
    }
  }
});
