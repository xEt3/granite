import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import resource from 'granite/mixins/controller-abstractions/resource';

@classic
export default class IndexController extends Controller.extend(resource) {
  @service
  auth;

  queryParams = [
    'closed',
    'setup',
    'job',
    'showFilters',
    'page',
    'limit'
  ];

  limit = 20;
  showFilters = false;
  closed = false;
  setup = false;
  job = null;

  @computed
  get intros () {
    return [{
      element:  '.ui.segment.container',
      intro:    'The recruiting campaigns screen shows you all of your recruiting campaigns and allows you to manage active and past openings.',
      position: 'top'
    }, {
      element:  '#add-job-opening',
      intro:    'You can use the add button to start recruiting campaigns when you\'ve added the appropriate job description.',
      position: 'top'
    }];
  }

  @action
  updateFilter (filter, value) {
    this.set(filter, value);
  }

  @action
  resetFilters () {
    this.setProperties({
      closed: false,
      setup:  false,
      job:    null
    });
  }
}
