import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend(refreshable, {
  ajax: service(),

  model ({ uploadId }) {
    return this.get('ajax').request(`/api/v1/employee/census/${uploadId}`)
    .then(fileData => {
      return hash({
        fileData,
        potentialData: this.get('ajax').post(`/api/v1/employee/census/${uploadId}/dryrun`, { data: { headerMap: fileData.data[0] } })
      });
    });
  },

  setupController (controller, model) {
    this._super(...arguments);
    controller.setProperties({
      displayDryRunResults: null,
      model:                model.fileData || model,
      potentialData:        model.potentialData
    });
  }
});
