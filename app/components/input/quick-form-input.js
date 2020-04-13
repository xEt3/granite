import Component from '@glimmer/component';
import { computed, defineProperty, action } from '@ember/object';

export default class InputQuickFormInputComponent extends Component {
  // classNameBindings:     [ 'computedClassName', 'field.parentClass' ],
  colorPickerComponents = {
    palette: true,
    preview: true,
    opacity: false,
    hue:     true,

    interaction: {
      hex:   true,
      rgba:  true,
      hsva:  true,
      input: true,
      clear: false,
      save:  false
    }
  }

  constructor () {
    super(...arguments);
    let path = `model.${this.args.field.path}`;
    defineProperty(this, 'value', computed.alias(path));
    this.initialValue = this[path];
  }

  get computedClassName () {
    let label = this.args.field.label,
        classN = this.args.field.class;

    return classN || (label || '').replace(/[^\s\w]/g, '').replace(/\s/g, '-').toLowerCase();
  }

  get baseInputClass () {
    let t = this.args.field.type,
        ic;

    if (this.args.field.removeBaseClass) {
      return '';
    }

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
  }

  get inputClass () {
    let fieldInputClass = this.args.field.inputClass,
        baseInputClass = this.baseInputClass;

    return fieldInputClass ? fieldInputClass + ' ' + baseInputClass : baseInputClass;
  }

  get rows () {
    return this.args.field.rows || '6';
  }

  @action
  handleOnChange (hsva) {
    //used for color picker component if type=color
    if (this.args.model) {
      this.args.model.color = hsva.toHEXA().toString();
    }
  }
}

/*
  USAGE:
  template
  <Input::QuickFormInput
    @field={{this.field}}
    @model={{this.model}}
    @controller={{this}}/>
*/
