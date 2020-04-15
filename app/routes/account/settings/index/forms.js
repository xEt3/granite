import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import refreshable from 'granite/mixins/refreshable';

@classic
export default class FormsRoute extends Route.extend(refreshable) {
  titleToken = 'Forms';

  model () {
    return this.store.query('form', { name: { $not: { $type: 10 } } });
  }
}
