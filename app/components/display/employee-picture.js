import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'img',
  attributeBindings: [ 'src' ],
  defaultUrl: '/assets/images/default-avatar.png',
  src: computed.or('url', 'defaultUrl')
});
