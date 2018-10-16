import Component from '@ember/component';
import { computed } from '@ember/object';
import { bind } from '@ember/runloop';
import { inject as service } from '@ember/service';

export default Component.extend({
  search:           service(),
  tagName:          '',
  debounceInterval: 1000,

  apiSettings: computed('debounceInterval', function () {
    return {
      throttle:      this.get('debounceInterval'),
      responseAsync: bind(this, this.performSearch)
    };
  }),

  performSearch (settings, callback) {
    console.log(settings.urlData.query);
    return this.get('search').performSearch(settings.urlData.query)
    .then(callback)
    .catch(callback);
  }
});
