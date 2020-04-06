import Route from 'granite/core/route';

export default class AccountEmployeeOffboardOptionsRoute extends Route {
  titleToken = 'Options'

  async model () {
    return {
      employee:       await super.model(...arguments),
      availableForms: (await this.store.query('form', { formType: 'exit-interview' })).toArray()
    };
  }

  setupController (controller, model) {
    const { employee, availableForms } = model;

    if (!employee.get('finalAddressLine1')) {
      employee.setProperties({
        finalAddressLine1: employee.addressLine1,
        finalAddressLine2: employee.addressLine2,
        finalAddressCity:  employee.addressCity,
        finalAddressZip:   employee.addressZip,
        finalAddressState: employee.addressState
      });
    }

    controller.setProperties({
      model:              employee,
      availableExitForms: availableForms
    });
  }
}
