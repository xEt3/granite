import classic from 'ember-classic-decorator';
import Component from '@ember/component';
import { run } from '@ember/runloop';

@classic
export default class AutoFocus extends Component {
  didInsertElement () {
    super.didInsertElement(...arguments);
    run.scheduleOnce('afterRender', () => this.$('input').focus());
  }
}
