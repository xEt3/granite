import Ember from 'ember';

const { Component, computed, defineProperty } = Ember;

const QuickFormInputComponent = Component.extend({
  classNames: [ 'field' ],
  classNameBindings: [ 'computedClassName' ],

  init () {
    this._super(...arguments);
    defineProperty(this, 'value', computed.alias(`model.${this.get('field.path')}`));
  },

  computedClassName: computed('field.label', function () {
    return (this.get('field.label') || '').replace(/\s/g, '-').toLowerCase();
  }),

  baseInputClass: computed('field.type', function () {
    return this.get('field.type') === 'select' ? 'selection' : 'ui fluid input';
  }),

  inputClass: computed('field.inputClass', function () {
    let fieldInputClass = this.get('field.inputClass'),
        baseInputClass = this.get('baseInputClass');

    return fieldInputClass ? fieldInputClass + ' ' + baseInputClass : baseInputClass;
  }),

  rows: computed('field.rows', function () {
    return this.get('field.rows') || '6';
  })
});

QuickFormInputComponent.reopenClass({
  positionalParams: [ 'field', 'model', 'controller' ]
});

export default QuickFormInputComponent;
