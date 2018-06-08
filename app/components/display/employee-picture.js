import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: 'img',
  attributeBindings: [ 'src' ],
  defaultUrl: computed('id', function(){
    let string = `/api/v1/employee/${this.get('id')}/avatar`;
    return string;
  }),
  src: computed.or('url', 'defaultUrl')
});
