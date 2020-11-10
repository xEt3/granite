import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class BenefitsExportMenuComponent extends Component {
  @service ajax
  @service data
  @service router

  @action
  async exportBenefits (format) {
    const { success, error } = this.data.createStatus('exportBenefits', true);

    try {
      let response = await this.ajax.request('/api/v1/benefits/export', { data: { format } });
      this.router.transitionTo('account.task', response.taskStatus);
    } catch (err) {
      error(err);
      return;
    }

    success('Started export.');
  }
}
