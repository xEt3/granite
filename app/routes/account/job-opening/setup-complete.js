import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';
import { run } from '@ember/runloop';

@classic
export default class SetupCompleteRoute extends Route {
  titleToken = 'Setup Finished';

  afterModel(model) {
    model.setProperties({
      setup:          false,
      setupStep:      null,
      setupProgress:  null,
      completedSetup: new Date()
    });

    this.analytics.trackEvent('Recruiting', 'campaign_created', 'Recruiting Campaign Created');
    this.analytics.trackEvent('Features', 'applicant_scoring', model.applicantScoring ? 'Used' : 'Did not use');
    this.analytics.trackEvent('Features', 'close_notice', model.sendCloseNotice ? 'Used' : 'Did not use');
    this.analytics.trackEvent('Features', 'applicant_sources', model.applicantSources?.length ?? 0);

    model.save().then(() => run.scheduleOnce('afterRender', () => run.later(() => {
      this.transitionTo('account.job-opening');
    }, 5000)));
  }
}
