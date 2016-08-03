import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'img',
  attributeBindings: [ 'src' ],
  defaultUrl: '/assets/images/default-avatar.png',
  src: computed.or('url', 'defaultUrl')
});
