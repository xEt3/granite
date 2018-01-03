import Ember from 'ember';
import SortableItem from 'ember-sortable/components/sortable-item';
import { formTypes } from 'granite/config/statics';

const { computed, run, observer } = Ember;

const labelSuggestions = [
  'What is your highest level of education?',
  'Select the skills that apply to you.',
  'What are your salary requirements?'
];

const typesWithOptions = [
  'select',
  'radio'
];

const typesWithScore = [
  'select',
  'radio',
  'checkbox',
  'toggle'
];

const FormElementComponent = SortableItem.extend({
  formTypes,
  class: [ 'form-element__list-item' ],
  classNameBindings: [ 'removing:form-element__list-item--removing' ],
  handle: '.form-element__handle',

  emptyObject: computed('model.type', function () {
    return Ember.Object.create();
  }),

  requiresOptions: computed('model.type', function () {
    let t = this.get('model.type');
    return t ? typesWithOptions.indexOf(t) > -1 : false;
  }),

  showScoring: computed('scoring', 'model.type', function () {
    let t = this.get('model.type');
    return t && this.get('scoring') ? typesWithScore.indexOf(t) > -1 : false;
  }),

  positionInForm: computed('index', function () {
    return this.get('index') + 1;
  }),

  labelSuggestion: computed(() =>
    `ex. ${labelSuggestions[Math.floor(Math.random() * labelSuggestions.length)]}`
  ),

  label: computed('model.{required,label}', 'positionInForm', function () {
    let l = this.get('model.label'),
        r = this.get('model.required'),
        label = l ? `${this.get('positionInForm')}) ${l}` : ' ';

    if ( l && r ) {
      label += '*';
    }

    return label;
  }),

  rerenderFormElement: observer('model.{allowAdditions,multiple}', function () {
    if ( this.get('isDestroyed') || this.get('isDestroying') ) {
      return;
    }

    let type = this.get('model.type');
    this.set('model.type', '');
    run.next(() => this.set('model.type', type));
  }),

  actions: {
    removeElement () {
      this.set('removing', true);

      run.later(() => {
        this.get('onRemove')(this.get('model'));
      }, 1000);
    },

    addOption () {
      this.get('model.options').pushObject(Ember.Object.create());
    },

    removeOption (option) {
      this.get('model.options').removeObject(option);
    }
  }
});

FormElementComponent.reopenClass({
  positionalParams: [ 'model', 'group' ]
});

export default FormElementComponent;