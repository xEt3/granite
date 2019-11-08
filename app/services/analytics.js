import Service, { inject as service } from '@ember/service';

export default class AnalyticsService extends Service {
  @service metrics

  __isRobo () {
    if (this.isRoboBrowser === undefined) {
      this.isRoboBrowser = /HeadlessChrome/.test(navigator.userAgent);
    }

    return this.isRoboBrowser;
  }

  /**
   * analytics#identifyUser
   * Identifies a user in metrics
   * @param  {String} userId       Passed to "distinctId" in metrics
   * @param  {Object} [options={}] Additional options to pass to metrics
   * @return {void}
   */
  identifyUser (userId, options = {}) {
    if (this.__isRobo()) {
      return;
    }

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
    if (this.__isRobo()) {
      return;
    }

    return this.metrics.trackEvent({
      category,
      action,
      label
    });
  }

  trackPage (opts) {
    if (this.__isRobo()) {
      return;
    }

    return this.metrics.trackPage(opts);
  }
}
