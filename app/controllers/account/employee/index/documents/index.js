import Controller from '@ember/controller';
import resource from 'granite/mixins/controller-abstractions/resource';

export default Controller.extend(resource, {
  queryParams: [
    'showFilters',
    'visibleToEmployee',
    'readOn',
    'signedOn'
  ],

  showFilters:       false,
  visibleToEmployee: null,
  readOn:            null,
  signedOn:          false,

  actions: {
    updateFilter (filter, value) {
      this.set(filter, value);
    },

    resetFilters () {
      this.setProperties({
        visibleToEmployee: false,
        readOn:            false,
        signedOn:          false
      });
    }
  }
});
