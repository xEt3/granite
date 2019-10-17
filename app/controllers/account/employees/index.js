import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagination from 'granite/mixins/controller-abstractions/pagination';

export default Controller.extend(pagination, {
  queryParams: [
    'showFilters',
    'onboarding',
    'offboarding',
    'terminated',
    'supervisor',
    'location',
    'hireDateStart',
    'hireDateEnd',
    'page',
    'limit',
    'sortProp',
    'sortAsc'
  ],

  limit:         20,
  showFilters:   false,
  onboarding:    false,
  offboarding:   false,
  terminated:    false,
  supervisor:    null,
  department:    null,
  location:      null,
  hireDateStart: null,
  hireDateEnd:   null,
  sortBy:        null,
  sortProp:      'created',
  sortAsc:       false,

  sortOptions: [{
    label: 'First Name',
    path:  'name.first'
  }, {
    label: 'Last Name',
    path:  'name.last'
  }, {
    label: 'Employee Number',
    path:  'employeeNumber'
  }, {
    label: 'Created Date',
    path:  'created'
  }],

  intros: computed(function () {
    return [{
      element:  '.divided.link.items',
      intro:    'The employees page shows you all of your employees at a glance.',
      position: 'top'
    }, {
      element:  '.divided.link.items .item',
      intro:    'Each item in the list represents an employee in your company.',
      position: 'top'
    }, {
      element:  '.divided.link.items .item .extra',
      intro:    'Labels quickly tell you what\'s new with an employee.',
      position: 'top'
    }, {
      element:  '#add-employee-trigger',
      intro:    'When you need to add an employee, click the add button and pick from a single employee or multiple (via CSV or Excel)',
      position: 'left'
    }];
  }),

  actions: {
    updateFilter (filter, value) {
      this.set(filter, value);
    },

    toggleSortAsc () {
      this.toggleProperty('sortAsc');
    },

    resetFilters () {
      this.setProperties({
        onboarding:    false,
        offboarding:   false,
        terminated:    false,
        supervisor:    null,
        department:    null,
        location:      null,
        hireDateStart: null,
        hireDateEnd:   null
      });
    }
  }
});
