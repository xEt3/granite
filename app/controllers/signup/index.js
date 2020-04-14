import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import { states as stateOptions } from 'granite/config';

@classic
export default class IndexController extends Controller.extend(addEdit) {
  stateOptions = stateOptions;
  selectedState = null;
  useMiddleName = false;

  @action
  saveCompany() {
    let company = this.get('model');

    this.ajaxStart();

    company.save()
    .then(() => {
      this.ajaxSuccess();
      this.transitionToRoute('signup.billing');
    })
    .catch(this.ajaxError.bind(this));
  }
}
