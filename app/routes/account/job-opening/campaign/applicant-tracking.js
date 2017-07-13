import Ember from 'ember';
import refreshable from 'granite/mixins/refreshable';

const { Route, RSVP: { hash } } = Ember;

export default Route.extend(refreshable, {
  queryParams: {
    showDisqualified: {
      refreshModel: true
    }
  },

  model (params) {
    const jobOpening = this.modelFor('account.job-opening');
    const applicationsQuery = {
      jobOpening: jobOpening.get('id'),
      sort: { created: 1 }
    };

    if (!params.showDisqualified) {
      applicationsQuery.disqualified = { $ne: true };
    }

    return hash({
      // Job opening
      jobOpening,
      // Applications for this pipeline
      applications: this.store.query('job-application', applicationsQuery),
      // Recruiting pipeline
      pipeline: this.store.query('recruiting-pipeline', {
        $or: [{
          jobOpenings: { $in: [ jobOpening.get('id') ] }
        }, {
          'jobOpenings.0': { $exists: false }
        }],
        limit: 1,
        sort: { jobOpenings: -1 } // Prefer to get back a jobOpening-tagged pipeline
      })
      .then(results => results ? results.get('firstObject') : results)
    });
  }
});
