import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'button',
  classNameBindings: [ 'loading' ],
  attributeBindings: [ 'type', '_disabled:disabled' ],
  _disabled: computed.or('loading', 'disabled')
});
