import Controller from '@ember/controller';
import resource from 'granite/mixins/controller-abstractions/resource';

export default Controller.extend(resource, {
  queryParams: [
    'showFilters',
    { visibleToEmployee: { type: 'boolean' } },
    { readOn: { type: 'boolean' } },
    { signedOn: { type: 'boolean' } }
  ],

  showFilters:       false,
  visibleToEmployee: null,
  readOn:            null,
  signedOn:          null,

  actions: {
    updateFilter (filter, value) {
      this.set(filter, value);
    },

    resetFilters () {
      this.setProperties({
        visibleToEmployee: null,
        readOn:            null,
        signedOn:          null
      });
    }
  }
});
