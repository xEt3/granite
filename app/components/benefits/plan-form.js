import Component from '@glimmer/component';
import { planForm, planOptions } from '../../config/forms/plans';
import { inject as service } from '@ember/service';

export default class BenefitsManualPlanComponent extends Component {
  currentForm = planForm
  planOptions = planOptions
  @service data
}
