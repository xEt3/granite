import Component from '@ember/component';
import { computed, defineProperty } from '@ember/object';

const QuickFormInputComponent = Component.extend({
  classNames:        [ 'field' ],
  classNameBindings: [ 'computedClassName', 'field.parentClass' ],

  init () {
    this._super(...arguments);
    let path = `model.${this.get('field.path')}`;
    defineProperty(this, 'value', computed.alias(path));
    this.set('initialValue', this.get(path));
  },

  computedClassName: computed('field.{label,class}', function () {
    let label = this.get('field.label'),
        classN = this.get('field.class');

    return classN || (label || '').replace(/[^\s\w]/g, '').replace(/\s/g, '-').toLowerCase();
  }),

  baseInputClass: computed('field.type', function () {
    let t = this.get('field.type'),
        ic;

    switch (t) {
    case 'select':
      ic = 'selection';
      break;
    case 'date':
      ic = 'ui field';
      break;
    case 'toggle':
      ic = 'toggle';
      break;
    default:
      ic = 'ui fluid input';
      break;
    }

    return ic;
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

QuickFormInputComponent.reopenClass({ positionalParams: [ 'field', 'model', 'controller' ] });

export default QuickFormInputComponent;
