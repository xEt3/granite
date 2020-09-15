import Route from 'granite/core/route';

export default class HrRoute extends Route {
  titleToken = 'HR Resources'

  async model () {
    const user = await this.auth.user,
          company = await user.company;

    return company.email;
  }
}
