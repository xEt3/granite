import Component from '@glimmer/component';
import { computed, action } from '@ember/object';

export default class PlanContributionsTableComponent extends Component {
  contributionGroups = ['Employee', 'Employee & Spouse', 'Employee & Children',' Family']

  @action
  cancel(){
    this.args.cancel()
  }

  @action
  async save(){
    this.args.save(this.wp)
  }
}
