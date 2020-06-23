import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { run } from '@ember/runloop';

export default class SocialSecurity extends Component {
  @tracked showSsn = true;

  @action
  didInsert () {
    run.later(() => {
      this.showSsn = false;
    }, 800);
  }

  get ssnInputType () {
    return this.showSsn ? 'text' : 'password';
  }
}
