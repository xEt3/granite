import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

export default Component.extend({
  tagName: '',
  showSsn: true,

  didInsertElement () {
    this._super(...arguments);
    run.later(() => this.set('showSsn', false), 800);
  },

  ssnInputType: computed('showSsn', function () {
    return this.get('showSsn') ? 'text' : 'password';
  })
});
