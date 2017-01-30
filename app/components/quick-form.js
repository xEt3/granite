import Ember from 'ember';

const { Component, computed } = Ember;

const QuickFormComponent = Component.extend({
  tagName: 'form',
  classNames: [ 'ui form' ],

  submit (e) {
    e.preventDefault();
    e.stopPropagation();
    this.get('onsubmit')();
  },

  _submitClass: computed('submitClass', function () {
    let userClass = this.get('submitClass') || '';
    return `ui ${userClass} button`;
  })
});

QuickFormComponent.reopenClass({
  positionalParams: [ 'form', 'model', 'controller' ]
});

export default QuickFormComponent;

/*
 USAGE:
 template
  {{quick-form
    formObject
    model
    controller
    onsubmit=(action "iDidItMom")}}

  in the controller
  form: computed(() => [{
    label: 'Whatcha name',
    labelClass: 'sr-only',
    inputClass: 'large',
    type: 'text', // text/number/search/etc
    path: 'name'
  }, {
    label: 'Whatcha do',
    type: 'textarea', // renders a textarea
    path: 'jobDescription'
  }, {
    label: 'Whatcha Gonna Do',
    type: 'select', // renders a dropdown
    inputClass: 'search',
    path: 'department', // value path
    contentPath: 'controller.departments', // values path
    displayKey: 'name' // optional
  }])
 */
