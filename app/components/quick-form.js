import Component from '@glimmer/component';

export default class QuickFormComponent extends Component {
  submit (e) {
    e.preventDefault();
    e.stopPropagation();
    this.args.onsubmit();
  }

  get _submitClass () {
    let userClass = this.args.submitClass || '';
    return `ui ${userClass} button`;
  }
}

/*
 USAGE:
 template
  <QuickForm
    @form={{this.formObject}}
    @model={{this.model}}
    @controller={{this}}
    @onsubmit={{this.iDidItMom}}/>

  in the controller
  form = [{
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
  }]
 */
