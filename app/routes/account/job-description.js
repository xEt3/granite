import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class JobDescriptionRoute extends Route {
  model(params) {
    return this.store.find('job', params.id);
  }
}
