import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import SortableItem from 'ember-sortable/components/sortable-item';
import { formTypes } from 'granite/config/statics';
import Object, { action } from '@ember/object';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';

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

@classic
@classNameBindings('removing:form-element__list-item--removing')
class FormElementComponent extends SortableItem {
  formTypes = formTypes;
  class = [ 'form-element__list-item' ];
  handle = '.form-element__handle';

  @computed('model.type', function () {
    return Object.create();
  })
  emptyObject;

  @computed('model.type', function () {
    let t = this.get('model.type');
    return t ? typesWithOptions.indexOf(t) > -1 : false;
  })
  requiresOptions;

  @computed('scoring', 'model.type', function () {
    let t = this.get('model.type');
    return t && this.get('scoring') ? typesWithScore.indexOf(t) > -1 : false;
  })
  showScoring;

  @computed('index', function () {
    return this.get('index') + 1;
  })
  positionInForm;

  @computed(function () {
    return `ex. ${labelSuggestions[Math.floor(Math.random() * labelSuggestions.length)]}`;
  })
  labelSuggestion;

  @computed('model.{required,label}', 'positionInForm', function () {
    let l = this.get('model.label'),
        r = this.get('model.required'),
        label = l ? `${this.get('positionInForm')}) ${l}` : ' ';

    if (l && r) {
      label += '*';
    }

    return label;
  })
  label;

  changedSelectProperty () {
    let type = this.get('model.type');
    this.set('loadingType', true);
    this.set('model.type', '');
    run.next(() => {
      this.set('model.type', type);
      this.set('loadingType', false);
    });
  }

  @action
  removeElement () {
    this.set('removing', true);

    run.later(() => {
      this.onRemove(this.model);
    }, 1000);
  }

  @action
  addOption () {
    this.get('model.options').pushObject(Object.create());
  }

  @action
  removeOption (option) {
    this.get('model.options').removeObject(option);
  }
}

FormElementComponent.reopenClass({ positionalParams: [ 'model', 'group' ] });

export default FormElementComponent;
