import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Options',

  async model () {
    return {
      employee:       await this._super(...arguments),
      availableForms: (await this.store.query('form', { formType: 'exit-interview' })).toArray()
    };
  },

  setupController (controller, model) {
    const { employee, availableForms } = model;

    if (!employee.get('finalAddressLine1')) {
      employee.setProperties({
        finalAddressLine1: employee.get('addressLine1'),
        finalAddressLine2: employee.get('addressLine2'),
        finalAddressCity:  employee.get('addressCity'),
        finalAddressZip:   employee.get('addressZip'),
        finalAddressState: employee.get('addressState')
      });
    }

    controller.setProperties({
      model:              employee,
      availableExitForms: availableForms
    });
  }
});
