import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  classNames: [ 'field' ],

  inputId: computed('elementId', 'attribute', function () {
    return this.get('elementId') + '-' + this.get('attribute');
  }),

  placeholder: computed('attribute', function () {
    return this.get('attribute') + ' value';
  })
});
