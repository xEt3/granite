import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  ajax: service(),

  queryParams: [ 'service' ],
  service: null,

  actions: {
    discover () {
      this.ajaxStart();

      const serviceName = this.get('service');

      this.get('ajax').request(`/api/v1/integrations/${serviceName}/discover-import`)
      .then(response => {
        this.ajaxSuccess(null, true);
        this.transitionToRoute('account.import.discovered', response, {
          queryParams: { service: serviceName }
        });
      });
    }
  }
});
