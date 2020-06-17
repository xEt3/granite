import Component from '@glimmer/component';

export default class FormStep extends Component {
  get fullLink () {
    return this.args.basePath + '.' + this.args.step.link;
  }
}
