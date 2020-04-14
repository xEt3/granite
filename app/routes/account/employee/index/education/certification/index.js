import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import del from 'granite/mixins/controller-abstractions/delete';

@classic
export default class IndexRoute extends Route.extend(del) {
  transitionAfterSave = 'account.employee.index.education';
}
