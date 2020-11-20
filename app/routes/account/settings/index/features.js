import Route from 'granite/core/route';

export default class AccountSettingsFeaturesRoute extends Route {
  titleToken = 'Granite Features';

  async model () {
    return {
      company: await super.model(...arguments),
      users:   await this.store.query('companyUser', { inactive: false })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model: model.company,
      users: model.users
    });
  }
}
