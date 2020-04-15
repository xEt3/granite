import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import { bind, scheduleOnce } from '@ember/runloop';
import uriForModel from 'granite/utils/uri-for-model';

@classic
export default class SuggestionInput extends Component {
  @service
  router;

  @service
  search;

  @tracked debounceInterval = 100;

  get apiSettings() {
    return {
      throttle:      this.get('debounceInterval'),
      responseAsync: bind(this, this.performSearch)
    };
  }

  performSearch(settings, callback) {
    return this.get('search').performSearch(settings.urlData.query)
    .then(callback)
    .catch(callback);
  }

  selected(resultItem) {
    const router = this.get('router');

    router.transitionTo.apply(router, uriForModel(resultItem))
    .then(() =>
      scheduleOnce('afterRender', () =>
        this.set('query', null)));
  }

  keyPress(e) {
    // detect full page flowthru (enter key)
    if (e.keyCode !== 13) {
      return;
    }

    let q = this.get('query');

    this.get('router').transitionTo('account.search', { queryParams: { q } });
    this.$('input').blur();
    this.set('query', null);
  }
}
