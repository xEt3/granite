import Service, { inject as service } from '@ember/service';

export default class AnalyticsService extends Service {
  @service metrics

  /**
   * analytics#identifyUser
   * Identifies a user in metrics
   * @param  {String} userId       Passed to "distinctId" in metrics
   * @param  {Object} [options={}] Additional options to pass to metrics
   * @return {void}
   */
  identifyUser (userId, options = {}) {
    return this.metrics.identify({
      ...options,
      distinctId: userId
    });
  }

  /**
   * analytics#trackEvent
   * Proxied to metrics adapters, but positionalized arguments for ease of use.
   * @param  {String} category     Event category
   * @param  {String} action       Event name
   * @param  {String|Number} label Label of the event
   * @return {void}
   */
  trackEvent (category, action, label) {
    return this.metrics.trackEvent({
      category,
      action,
      label
    });
  }
}
