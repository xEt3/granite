import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';
import { eeocSelectOptions, eeocForm } from 'granite/config/forms/eeo';

@classic
export default class VisualIdController extends Controller.extend(ajaxStatus) {
  eeocSelectOptions = eeocSelectOptions;

  @service
  ajax;

  @computed('model.{race,gender}')
  get visualIdForm () {
    let model = this.model,
        elements = eeocForm.filter(el => model[el.path]);

    return elements;
  }

  @computed('visualId.{race,gender}', 'model.{race,gender}')
  get formInvalid () {
    let { race, gender } = this.model,
        visualId = this.visualId,
        required = [ race ? 'race' : null, gender ? 'gender' : null ].filter(Boolean);

    return required.some(path => !visualId[path]);
  }

  @action
  async submitVisualId () {
    if (this.formInvalid) {
      return;
    }

    const employee = this.employee,
          data = this.visualId;

    this.ajaxStart();

    try {
      await this.ajax.post(`/api/v1/eeo/visual-id/${employee.get('id')}`, { data });
    } catch (e) {
      return this.ajaxError(e);
    }

    this.ajaxSuccess('Visual ID successfully recorded.');
    this.send('refresh');
    this.transitionToRoute('account.employee');
  }
}
