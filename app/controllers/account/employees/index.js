import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
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
  })
});
