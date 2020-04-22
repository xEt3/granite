import Component from '@glimmer/component';

export default class TableRow extends Component {
  get isInvalid () {
    let v = this.args.validation;
    return v && v.some((cell = {}) => cell.invalid);
  }
}
