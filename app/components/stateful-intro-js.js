import Component from '@glimmer/component';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

export default class StatefulIntroJs extends Component {
  markAsShownOnExit = true;

  get showSteps () {
    let shownHints = this.args.user.get('shownHints'),
        hintKey = this.args.hintKey;

    assert('You must specify a hintKey to use stateful-intro-js', !!hintKey);

    return shownHints ? !shownHints.includes(hintKey) : true;
  }

  @action
  markAsShown (exit) {
    if (exit && !this.markAsShownOnExit) {
      return;
    }

    let user = this.args.user.get('content');

    if (!user) {
      return;
    }

    let hints = user.shownHints,
        key = this.args.hintKey;

    if (!hints) {
      return;
    }

    hints.addObject(key);
    user.save();
  }
}
