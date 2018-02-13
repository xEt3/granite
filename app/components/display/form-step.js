import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName: '',

  fullLink: computed('step.link', 'basePath', function () {
    return this.get('basePath') + '.' + this.get('step.link');
  })
});
