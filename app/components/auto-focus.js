import Ember from 'ember';

const { run } = Ember;

export default Ember.Component.extend({
  didInsertElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', () => this.$('input').focus());
  }
});
