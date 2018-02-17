import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import { on } from '@ember/object/evented';
import $ from 'jquery';

export default Controller.extend({
  getWindowHeight: on('init', function () {
    run.scheduleOnce('afterRender', () => {
      this.set('currentWindowHeight', $(window).height());
    });
  })
});
