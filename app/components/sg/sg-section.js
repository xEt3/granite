import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  classNames: [ 'sg__section', 'ui stacked segment' ],
  classNameBindings: [ '_hidden:hidden' ],

  _hidden: computed('focus', 'name', function () {
    return this.get('focus') && this.get('focus') !== this.get('name');
  })
});
