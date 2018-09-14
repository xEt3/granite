import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName:           'img',
  attributeBindings: [ 'src' ],
  defaultUrl:        computed('employeeId', function () {
    return this.get('employeeId') ? `/api/v1/employee/${this.get('employeeId')}/avatar` : 'https://www.gravatar.com/avatar/?f=y&d=mp';
  }),
  src: computed.or('url', 'defaultUrl')
});
