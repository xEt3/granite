import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import resource from 'granite/mixins/controller-abstractions/resource';

export default Controller.extend(resource, {
  auth: service(),

  queryParams: [
    'closed',
    'setup',
    'job',
    'showFilters',
    'page',
    'limit'
  ],

  limit:       20,
  showFilters: false,
  closed:      false,
  setup:       false,
  job:         null,

  intros: computed(function () {
    return [{
      element:  '.ui.segment.container',
      intro:    'The recruiting campaigns screen shows you all of your recruiting campaigns and allows you to manage active and past openings.',
      position: 'top'
    }, {
      element:  '#add-job-opening',
      intro:    'You can use the add button to start recruiting campaigns when you\'ve added the appropriate job description.',
      position: 'top'
    }];
  }),

  actions: {
    updateFilter (filter, value) {
      this.set(filter, value);
    },

    resetFilters () {
      this.setProperties({
        closed: false,
        setup:  false,
        job:    null
      });
    }
  }
});
