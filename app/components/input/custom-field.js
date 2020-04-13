import Component from '@glimmer/component';
import { elementId } from 'granite/core';

@elementId
export default class InputCustomFieldComponent extends Component {
  get inputId () {
    return this.elementId + '-' + this.args.attribute;
  }

  get placeholder () {
    return this.args.attribute + ' value';
  }
}
