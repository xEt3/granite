import Component from '@ember/component';
import { action, computed } from '@ember/object';
import { assert } from '@ember/debug';

export default class StatefulIntroJs extends Component {
  markAsShownOnExit = true;

  @computed('user.shownHints.[]')
  get showSteps () {
    let shownHints = this.get('user.shownHints'),
        hintKey = this.hintKey;

    assert('You must specify a hintKey to use stateful-intro-js', !!hintKey);

    return shownHints ? !shownHints.includes(hintKey) : true;
  }

  @action
  markAsShown (exit) {
    if (exit && !this.markAsShownOnExit) {
      return;
    }

    let user = this.get('user.content');

    if (!user) {
      return;
    }

    let hints = user.get('shownHints'),
        key = this.hintKey;

    if (!hints) {
      return;
    }

    hints.addObject(key);
    user.save();
  }
}
