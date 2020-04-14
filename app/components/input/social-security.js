import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { run } from '@ember/runloop';

@classic
@tagName('')
export default class SocialSecurity extends Component {
  showSsn = true;

  didInsertElement() {
    super.didInsertElement(...arguments);
    run.later(() => this.set('showSsn', false), 800);
  }

  @computed('showSsn')
  get ssnInputType() {
    return this.get('showSsn') ? 'text' : 'password';
  }
}
