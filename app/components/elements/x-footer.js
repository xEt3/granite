import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'footer',
  classNames: [ 'elements__footer' ],
  now: new Date()
});
