import Component from '@glimmer/component';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';
import { computed, action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FormIntegrationButtonComponent extends Component {
  @service auth
  @service data
  @service ajax

  @tracked linkedServices = A()

  apiUri = '/api/v1/integrations/intent/:service'
  type =   'button'

  @computed.reads('data.statuses.working.isLoading') disabled

  get alreadyLinked () {
    return (this.args.linkedServices || []).includes(this.args.service);
  }

  @action
  click (e) {
    e.preventDefault();

    if (this.alreadyLinked) {
      return;
    }

    this.initiateIntegrationIntent();
  }

  @action
  async initiateIntegrationIntent () {
    let { success, error } = this.data.createStatus();

    let integration = this.args.service,
        apiUri = this.apiUri.replace(':service', integration);

    try {
      let response = await this.ajax.post(apiUri);
      success(null, true);
      window.location = response.authUri;
    } catch (e) {
      error(e);
    }
  }

  @action
  notify () {
    this.args.onNotify.apply(null, arguments);
  }
}
