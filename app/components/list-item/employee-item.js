import Ember from 'ember';

const { Component } = Ember;

let EmployeeItemComponent = Component.extend({
  tagName: ''
});

EmployeeItemComponent.reopenClass({
  positionalParams: [ 'employee' ]
});

export default EmployeeItemComponent;
