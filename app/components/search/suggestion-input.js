import Component from '@ember/component';
import { computed } from '@ember/object';
import { bind, scheduleOnce } from '@ember/runloop';
import { inject as service } from '@ember/service';
import uriForModel from 'granite/utils/uri-for-model';

export default Component.extend({
  router:           service(),
  search:           service(),
  debounceInterval: 100,

  apiSettings: computed('debounceInterval', function () {
    return {
      throttle:      this.get('debounceInterval'),
      responseAsync: bind(this, this.performSearch)
    };
  }),

  performSearch (settings, callback) {
    return this.get('search').performSearch(settings.urlData.query)
    .then(callback)
    .catch(callback);
  },

  selected (resultItem) {
    const router = this.get('router');

    router.transitionTo.apply(router, uriForModel(resultItem))
    .then(() =>
      scheduleOnce('afterRender', () =>
        this.set('query', null)));
  },

  keyPress (e) {
    // detect full page flowthru (enter key)
    if (e.keyCode !== 13) {
      return;
    }

    let q = this.get('query');

    this.get('router').transitionTo('account.search', { queryParams: { q } });
    this.$('input').blur();
    this.set('query', null);
  }
});
