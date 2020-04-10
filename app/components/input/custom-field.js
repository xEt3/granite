import Component from '@glimmer/component';
// import { computed } from '@ember/object';

export default class InputCustomFieldComponent extends Component {
  elementId = Math.round(Math.random() * Math.pow(10, 10));
  value = this.args.object[this.args.attribute]

  get inputId () {
    return this.elementId + '-' + this.args.attribute;
  }

  get placeholder () {
    return this.args.attribute + ' value';
  }
}
