import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { eeocSelectOptions, eeocForm } from 'granite/config/forms/eeo';

export default class AccountEmployeeVisualIdController extends Controller {
  @service ajax
  @service data

  eeocSelectOptions = eeocSelectOptions

  get visualIdForm () {
    let model = this.model,
        elements = eeocForm.filter(el => model[el.path]);

    return elements;
  }

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

    let { success, error } = this.data.createStatus();

    try {
      await this.ajax.post(`/api/v1/eeo/visual-id/${employee.get('id')}`, { data });
    } catch (e) {
      return error(e);
    }

    success('Visual ID successfully recorded.');
    this.send('refreshModel');
    this.transitionToRoute('account.employee');
  }
}
