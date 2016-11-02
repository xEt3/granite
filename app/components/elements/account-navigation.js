import Ember from 'ember';

const { Component, computed, set } = Ember;

export default Component.extend({
  tagName: '',
  linkPrefix: 'account.',

  _links: computed('links', function () {
    return this.get('links').map(link => {
      set(link, 'fullLink', this.get('linkPrefix') + link.link);
      return link;
    });
  })
});
