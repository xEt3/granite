import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CertificationRoute extends Route {
  titleToken(model) {
    return model.name;
  }

  async model({ certification_id }) {
    return this.store.find('certification', certification_id);
  }
}
