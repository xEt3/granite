import Component from '@glimmer/component';

export default class FormActionButtonComponent extends Component {
  get _disabled () {
    return this.args.loading || this.args.disabled;
  }
}
