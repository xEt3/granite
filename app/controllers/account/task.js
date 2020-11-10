import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TaskController extends Controller {
  @service ajax
  @service data

  @tracked secureUrl

  @action
  async generateSecureLink () {
    const ts = this.model,
          { success, error } = this.data.createStatus('generateSecureLink', false);

    try {
      const response = await this.ajax.request(`/api/v1/task-status/${ts.id}/file`);

      if (response.url) {
        this.secureUrl = response.url;
      }

      success();
    } catch (err) {
      error(err);
    }
  }
}
