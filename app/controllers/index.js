import classic from 'ember-classic-decorator';
import { on } from '@ember-decorators/object';
import Controller from '@ember/controller';
import { run } from '@ember/runloop';
import $ from 'jquery';

@classic
export default class IndexController extends Controller {
  @on('init')
  getWindowHeight () {
    run.scheduleOnce('afterRender', () => {
      this.set('currentWindowHeight', $(window).height());
    });
  }
}
