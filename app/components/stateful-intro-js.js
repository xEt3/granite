import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Component from '@ember/component';
import { assert } from '@ember/debug';

@classic
export default class StatefulIntroJs extends Component {
  markAsShownOnExit = true;

  @computed('user.shownHints.[]')
  get showSteps() {
    let shownHints = this.get('user.shownHints'),
        hintKey = this.get('hintKey');

    assert('You must specify a hintKey to use stateful-intro-js', !!hintKey);

    return shownHints ? !shownHints.includes(hintKey) : true;
  }

  @action
  markAsShown(exit) {
    if (exit && !this.get('markAsShownOnExit')) {
      return;
    }

    let user = this.get('user.content');

    if (!user) {
      return;
    }

    let hints = user.get('shownHints'),
        key = this.get('hintKey');

    if (!hints) {
      return;
    }

    hints.addObject(key);
    user.save();
  }
}
