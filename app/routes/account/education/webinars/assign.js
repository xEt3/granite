import Route from '@ember/routing/route';

export default class AssignRoute extends Route {
  async model ({ authorization_id }) {
    const authorization = await this.store.find('webinar-authorization', authorization_id);

    return {
      authorization,
      webinar:   await authorization.get('webinar'),
      employees: await this.store.query('employee', {
        select: 'name jobTitle',
        sort:   { 'name.last': 1 }
      })
    };
  }
}
