import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';

@classic
export default class IndexController extends Controller.extend(ajaxStatus) {
  @service
  ajax;

  queryParams = [ 'service' ];
  service = null;

  @action
  discover() {
    this.ajaxStart();

    const serviceName = this.get('service');

    this.get('ajax').request(`/api/v1/integrations/${serviceName}/discover-import`)
    .then(response => {
      this.ajaxSuccess(null, true);
      this.transitionToRoute('account.import.discovered', response, { queryParams: { service: serviceName } });
    });
  }
}
