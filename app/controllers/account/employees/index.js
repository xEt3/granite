import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagination from 'granite/mixins/controller-abstractions/pagination';

export default Controller.extend(pagination, {
  queryParams: [ 'showFilters', 'onboarding', 'supervisedBy', 'location', 'hireDateStart', 'hireDateEnd', 'page' ],
  limit: 20,

  hdStart: null,
  hdEnd: null,
  showFilters: false,
  onboarding: false,
  supervisedBy: null,
  department: null,
  location: null,
  hireDateStart: null,
  hireDateEnd: null,

  intros: computed(function () {
    return [{
      element: '.divided.link.items',
      intro: 'The employees page shows you all of your employees at a glance.',
      position: 'top'
    }, {
      element: '.divided.link.items .item',
      intro: 'Each item in the list represents an employee in your company.',
      position: 'top'
    }, {
      element: '.divided.link.items .item .extra',
      intro: 'Labels quickly tell you what\'s new with an employee.',
      position: 'top'
    }, {
      element: '#add-employee-trigger',
      intro: 'When you need to add an employee, click the add button and pick from a single employee or multiple (via CSV or Excel)',
      position: 'left'
    }];
  }),

  actions : {
    setSearchDates () {
      const startDateEntered = this.get('startDateEntered');
      const endDateEntered = this.get('endDateEntered');
      if( startDateEntered && endDateEntered ) {
        this.setProperties({
          startDate: startDateEntered,
          endDate: endDateEntered,
          errorMessage: null
        });
      } else {
        this.set('errorMessage', 'Both date fields need to be filled.');
      }
    },

    updateFilter (filter, value) {
      console.log('updateFilter', filter, value);
      this.set(filter, value);
    },

    toggleProperty (toToggle) {
      this.toggleProperty(toToggle);
      if (toToggle==='supervisorToggle') {
        this.set('supervisedBy', null);
      } else if (toToggle==='departmentToggle') {
        this.set('department', null);
      } else if (toToggle==='locationToggle') {
        this.set('location', null);
      } else if (toToggle==='hireDateToggle') {
        this.set('startDate', null);
        this.set('startDateEntered', null);
        this.set('endDate', null);
        this.set('errorMessage', null);
      }
    }
  }
});
