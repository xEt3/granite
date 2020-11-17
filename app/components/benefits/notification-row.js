import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BenefitNotificationRowComponent extends Component {
  @service store
  @tracked user

  @action
  async findUser () {
    let { user, email } = this.args.recipient;
    this.user = user ? await this.store.findRecord('companyUser', user) : email;
  }
}