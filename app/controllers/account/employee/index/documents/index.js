import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import resource from 'granite/mixins/controller-abstractions/resource';

@classic
export default class IndexController extends Controller.extend(resource) {
  queryParams = [
    'showFilters',
    { visibleToEmployee: { type: 'boolean' } },
    { readOn: { type: 'boolean' } },
    { signedOn: { type: 'boolean' } }
  ];

  showFilters = false;
  visibleToEmployee = null;
  readOn = null;
  signedOn = null;

  @action
  updateFilter (filter, value) {
    this.set(filter, value);
  }

  @action
  resetFilters () {
    this.setProperties({
      visibleToEmployee: null,
      readOn:            null,
      signedOn:          null
    });
  }
}
