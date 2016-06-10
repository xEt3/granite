import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: [ 'sg__section' ],
  classNameBindings: [ '_hidden:hidden' ],

  _hidden: computed('focus', 'name', function () {
    return this.get('focus') && this.get('focus') !== this.get('name');
  })
});
