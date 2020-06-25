import Route from 'granite/core/route';

export default class AccountJobOpeningCampaignApplicantTrackingRoute extends Route {
  titleToken = 'Applicants'
  queryParams = { showDisqualified: { refreshModel: true } }

  async model (params) {
    const jobOpening = this.modelFor('account.job-opening');
    const applicationsQuery = {
      jobOpening: jobOpening.id,
      sort:       { created: 1 }
    };

    if (!params.showDisqualified) {
      applicationsQuery.disqualified = { $ne: true };
    }

    let pipeline = await this.store.query('recruiting-pipeline', {
      $or:   [{ jobOpenings: { $in: [ jobOpening.id ] } }, { 'jobOpenings.0': { $exists: false } }],
      limit: 1,
      sort:  { jobOpenings: -1 } // Prefer to get back a jobOpening-tagged pipeline
    });

    return {
      // Job opening
      jobOpening,
      job:          jobOpening.job,
      // Applications for this pipeline
      applications: await this.store.query('job-application', applicationsQuery),
      employees:    await this.store.query('employee', { sort: { lastName: -1 } }),
      // Recruiting pipeline
      pipeline:     pipeline ? pipeline.firstObject : pipeline
    };
  }
}
