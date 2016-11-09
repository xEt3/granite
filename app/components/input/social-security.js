import Ember from 'ember';

const { run, computed } = Ember;

export default Ember.Component.extend({
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
