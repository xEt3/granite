import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  tagName: '',
  ssnInputType: computed('showSsn', function () {
    return this.get('showSsn') ? 'text' : 'password';
  })
});
