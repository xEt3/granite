import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: '',
  linkPrefix: 'account.',

  _links: computed('links', function () {
    return this.get('links').map(link => {
      link.fullLink = this.get('linkPrefix') + link.link;
      return link;
    });
  })
});
