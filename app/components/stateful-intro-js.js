import Component from '@ember/component';
import { computed } from '@ember/object';
import { assert } from '@ember/debug';

export default Component.extend({
  markAsShownOnExit: true,

  showSteps: computed('user.shownHints.[]', function () {
    let shownHints = this.get('user.shownHints'),
        hintKey = this.get('hintKey');

    assert('You must specify a hintKey to use stateful-intro-js', !!hintKey);

    return shownHints ? !shownHints.includes(hintKey) : true;
  }),

  actions: {
    markAsShown (exit) {
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
});
