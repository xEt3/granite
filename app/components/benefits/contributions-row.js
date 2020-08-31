import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class PlanContributionsComponent extends Component {
  @service auth
  @service data
  @computed.reads('auth.user.company.wellnessPlan') wellnessPlan
}
