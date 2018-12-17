import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  tagName:    '',
  linkPrefix: 'account.',

  _links: computed('links', function () {
    return [ ...this.get('links') ].map(link => {
      return Object.assign({}, link, { fullLink: this.get('linkPrefix') + link.link });
    });
  })
});
