import Component from '@ember/component';
import { computed, set } from '@ember/object';

export default Component.extend({
  tagName:    '',
  linkPrefix: 'account.',

  _links: computed('links', function () {
    return this.get('links').map(link => {
      set(link, 'fullLink', this.get('linkPrefix') + link.link);
      return link;
    });
  })
});
