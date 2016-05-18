import Ember from 'ember';

const { computed } = Ember;

export default Ember.Controller.extend({
  navTransparent: computed.equal('currentPath', 'index'),
  topLevel: computed('currentPath', function () {
    return this.get('currentPath').indexOf('account') < 0;
  })
});
