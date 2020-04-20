import Component from '@glimmer/component';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class PendingApplicant extends Component {
  get isSelected () {
    return (this.args.selected || A()).includes(this.args.model);
  }

  @action
  click (e) {
    if (e.target.className.indexOf('content__link') < 0) {
      e.preventDefault();
      this.select();
    }
  }

  @action
  select () {
    this.args.onSelectChange(this.args.model, this.args.isSelected);
  }
}
