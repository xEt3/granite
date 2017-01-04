import Ember from 'ember';

const { Component, computed, defineProperty } = Ember;

const QuickFormInputComponent = Component.extend({
  classNames: [ 'field' ],
  classNameBindings: [ 'computedClassName', 'field.parentClass' ],

  init () {
    this._super(...arguments);
    defineProperty(this, 'value', computed.alias(`model.${this.get('field.path')}`));
  },

  computedClassName: computed('field.label', function () {
    return (this.get('field.label') || '').replace(/[^\s\w]/g, '').replace(/\s/g, '-').toLowerCase();
  }),

  baseInputClass: computed('field.type', function () {
    let t = this.get('field.type');
    return t === 'select' ? 'selection' : t === 'date' ? 'ui field' : 'ui fluid input';
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
