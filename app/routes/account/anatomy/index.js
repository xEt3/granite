import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { hash } from 'rsvp';

@classic
export default class IndexRoute extends Route {
  titleToken = 'Company Anatomy';

  model() {
    return hash({
      supervisors: this.store.query('employee', { $report: 'supervisors' }),
      orgHead:     this.store.query('employee', { $report: 'organizationHead' })
    });
  }

  setupController(controller, model) {
    controller.set('model', [ model.orgHead.get('firstObject'), ...model.supervisors.toArray() ].uniq());
  }
}
