import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'img',
  attributeBindings: [ 'src' ],
  defaultUrl: computed('id', function() {
    return this.get('id') ? `/api/v1/employee/${this.get('id')}/avatar` : 'https://www.gravatar.com/avatar/?f=y&d=mp';
  }),
  src: computed.or('url', 'defaultUrl')
});
