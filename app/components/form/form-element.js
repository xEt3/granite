import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import SortableItem from 'ember-sortable/components/sortable-item';
import { formTypes } from 'granite/config/statics';
import Object, { action } from '@ember/object';
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

  get emptyObject () {
    return Object.create();
  }

  get requiresOptions () {
    let t = this.model.type;
    return t ? typesWithOptions.indexOf(t) > -1 : false;
  }

  get showScoring () {
    let t = this.model.type;
    return t && this.scoring ? typesWithScore.indexOf(t) > -1 : false;
  }

  get positionInForm () {
    return this.index + 1;
  }

  get labelSuggestion () {
    return `ex. ${labelSuggestions[Math.floor(Math.random() * labelSuggestions.length)]}`;
  }

  get label () {
    let l = this.model.label,
        r = this.model.required,
        label = l ? `${this.positionInForm}) ${l}` : ' ';

    if (l && r) {
      label += '*';
    }

    return label;
  }

  changedSelectProperty () {
    let type = this.model.type;
    this.loadingType = true;
    this.model.type = '';
    run.next(() => {
      this.model.type = type;
      this.loadingType = false;
    });
  }

  @action
  removeElement () {
    this.removing = true;

    run.later(() => {
      this.onRemove(this.model);
    }, 1000);
  }

  @action
  addOption () {
    this.model.options.pushObject(Object.create());
  }

  @action
  removeOption (option) {
    this.model.options.removeObject(option);
  }
}

FormElementComponent.reopenClass({ positionalParams: [ 'model', 'group' ] });

export default FormElementComponent;
