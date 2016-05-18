import Ember from 'ember';

const { on, run, $, set } = Ember;

export default Ember.Controller.extend({
  getWindowHeight: on('init', function () {
    run.scheduleOnce('afterRender', () => {
      this.set('currentWindowHeight', $(window).height());
    });
  })
});
