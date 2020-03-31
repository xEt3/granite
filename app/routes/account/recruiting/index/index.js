import { GraniteResourceRoute } from 'granite/core/route';

export default class AccountRecruitingRoute extends GraniteResourceRoute {
  titleToken = 'Recruiting Campaigns'
  modelName  =  'job-opening'

  queryParams = {
    job:    { refreshModel: true },
    closed: { refreshModel: true },
    setup:  { refreshModel: true },
    page:   { refreshModel: true },
    limit:  { refreshModel: true },
    sortBy: { refreshModel: true }
  }

  sort = {
    completedOn: 1,
    startOn:     1
  }

  filters = [
    'job'
  ]

  mutateQuery (query, params) {
    [ 'closed', 'setup' ].forEach(v => {
      if (params[v]) {
        query[v] = true;
      }
    });
  }

  async model () {
    return {
      campaigns: await super.model(...arguments),
      jobs:      await this.store.query('job', {
        select: '_id title',
        sort:   { 'name.last': 1 }
      })
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model: model.campaigns,
      jobs:  model.jobs
    });
  }
}
