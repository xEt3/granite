import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { run } from '@ember/runloop';

@classic
@tagName('')
export default class SocialSecurity extends Component {
  @tracked showSsn = true;

  didInsertElement () {
    super.didInsertElement(...arguments);
    run.later(() => this.set('showSsn', false), 800);
  }

  get ssnInputType () {
    return this.showSsn ? 'text' : 'password';
  }
}
