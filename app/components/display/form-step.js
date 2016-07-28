import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: '',

  fullLink: computed('step.link', 'basePath', function () {
    return this.get('basePath') + '.' + this.get('step.link');
  })
});
