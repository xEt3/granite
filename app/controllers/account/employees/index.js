import Controller from '@ember/controller';
import { computed } from '@ember/object';
import pagination from 'granite/mixins/controller-abstractions/pagination';

export default Controller.extend(pagination, {
  queryParams: ['expandFiltered', 'onboarding', 'supervisedBy', 'page'],

  filterCategories: ['onboarding', 'hireDate', 'supervisor', 'department', 'location'],
  limit: 20,
  expandFiltered: false,
  onboarding: false,
  supervisorToggle: false,
  supervisedBy: null,
  departmentToggle: false,
  department: null,

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
    changeFilter (filterToChange) {
      let filter = this.get('filters');
      if(filter.includes(filterToChange)){
        filter.removeObject(filterToChange)
      } else {
        filter.addObject(filterToChange);
      }
    },

    toggleProperty (toToggle) {
      this.toggleProperty(toToggle);
      if(toToggle==='supervisorToggle'){
        this.set('supervisedBy', null);
      } else if (toToggle==='departmentToggle') {
        this.set('department', null);
      }
    }
  }
});
