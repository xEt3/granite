import Route from '@ember/routing/route';

export default Route.extend({
  titleToken: 'Onboard',

  async model () {
    let employee = this._super(...arguments),
        { addressState } = await employee.get('company');

    employee.set('addressState', addressState);
    return employee;
  }
});
