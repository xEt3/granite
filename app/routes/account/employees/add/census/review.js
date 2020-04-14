import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';
import { hash } from 'rsvp';

@classic
export default class ReviewRoute extends Route.extend(refreshable) {
  @service
  ajax;

  model({ uploadId }) {
    return this.get('ajax').request(`/api/v1/employee/census/${uploadId}`)
    .then(fileData => {
      return hash({
        fileData,
        potentialData: this.get('ajax').post(`/api/v1/employee/census/${uploadId}/dryrun`, { data: { headerMap: fileData.data[0] } })
      });
    });
  }

  setupController(controller, model) {
    super.setupController(...arguments);
    controller.setProperties({
      displayDryRunResults: null,
      model:                model.fileData || model,
      potentialData:        model.potentialData
    });
  }
}
