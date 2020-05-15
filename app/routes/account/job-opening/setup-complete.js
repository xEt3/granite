import Route from 'granite/core/route';
import { run } from '@ember/runloop';

export default class SetupCompleteRoute extends Route {
  titleToken = 'Setup Finished';

  async afterModel (model) {
    Object.assign(model, {
      setup:          false,
      setupStep:      null,
      setupProgress:  null,
      completedSetup: new Date()
    });

    this.analytics.trackEvent('Recruiting', 'campaign_created', 'Recruiting Campaign Created');
    this.analytics.trackEvent('Features', 'applicant_scoring', model.applicantScoring ? 'Used' : 'Did not use');
    this.analytics.trackEvent('Features', 'close_notice', model.sendCloseNotice ? 'Used' : 'Did not use');
    this.analytics.trackEvent('Features', 'applicant_sources', model.applicantSources?.length ?? 0);

    await model.save();

    run.scheduleOnce('afterRender', () => run.later(() => {
      this.transitionTo('account.job-opening');
    }, 5000));
  }
}
