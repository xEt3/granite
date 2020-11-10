import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PlanContributionsTableComponent extends Component {
  @service data
  contributionGroups = [ 'Employee', 'Employee & Spouse', 'Employee & Children', 'Family' ]
}
