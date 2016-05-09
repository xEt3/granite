import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
  classNames: [ 'sg__color', 'col-md-2' ],
  classNameBindings: [ 'computedClassName' ],

  computedClassName: computed('color', function () {
    return 'sg__color-' + this.get('color');
  })
});
