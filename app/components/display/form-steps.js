import Component from '@glimmer/component';
import { action } from '@ember/object';

const dictMap = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];

export default class FormSteps extends Component {
  @action
  didReceiveAttrs () {
    this._step = this.step;
  }

  get dictStep () {
    return dictMap[this.args.steps.length - 1];
  }
}
