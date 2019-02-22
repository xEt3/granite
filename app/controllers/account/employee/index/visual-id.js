import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import { eeocSelectOptions, eeocForm } from 'granite/config/forms/eeo';

export default Controller.extend(ajaxStatus, {
  eeocSelectOptions,

  ajax: service(),

  visualIdForm: computed('model.{race,gender}', function () {
    let model = this.get('model'),
        elements = eeocForm.filter(el => model[el.path]);

    return elements;
  }),

  formInvalid: computed('visualId.{race,gender}', 'model.{race,gender}', function () {
    let { race, gender } = this.get('model'),
        visualId = this.get('visualId'),
        required = [ race ? 'race' : null, gender ? 'gender' : null ].filter(Boolean);

    return required.some(path => !visualId[path]);
  }),

  actions: {
    async submitVisualId () {
      if (this.get('formInvalid')) {
        return;
      }

      const employee = this.get('employee'),
            data = this.get('visualId');

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
});
