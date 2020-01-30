import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class StreamRoute extends Route {
  @service ajax

  async model ({ authorization_id }) {
    return {
      authorization: await this.store.find('webinar-authorization', authorization_id),
      playback:      await this.ajax.request(`/api/v1/webinar-authorization/${authorization_id}/playback`)
    };
  }
}
