import Component from '@ember/component';

let EmployeeItemComponent = Component.extend({
  tagName: ''
});

EmployeeItemComponent.reopenClass({
  positionalParams: [ 'employee' ]
});

export default EmployeeItemComponent;
