import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
  ajax: service(),

  model ({ uploadId }) {
    return this.get('ajax').request(`/api/v1/employee/census/${uploadId}`)
    .then(fileData => hash({
      fileData,
      potentialData: this.get('ajax').post(`/api/v1/employee/census/${uploadId}/dryrun`, { data: { headerMap: fileData.data[0] } })
    }));
  },

  setupController (controller, model) {
    controller.set('dryrunResult', null);
    this._super(...arguments);
    controller.setProperties({
      dryrunResult:  null,
      model:         model.fileData,
      potentialData: model.potentialData
    });
  }
});
