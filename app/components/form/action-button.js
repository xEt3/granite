import Component from '@ember/component';
import { or } from '@ember/object/computed';

export default Component.extend({
  tagName: 'button',
  classNameBindings: [ 'loading' ],
  attributeBindings: [ 'type', '_disabled:disabled' ],
  _disabled: or('loading', 'disabled')
});
