import { GraniteResourceController } from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountRecruitingController extends GraniteResourceController {
  @service auth

  queryParams = [
    'closed',
    'setup',
    'job',
    'showFilters',
    'page',
    'limit'
  ]

  showFilters = false
  closed = false
  setup = false
  job = null

  intros = [{
    element:  '.ui.segment.container',
    intro:    'The recruiting campaigns screen shows you all of your recruiting campaigns and allows you to manage active and past openings.',
    position: 'top'
  }, {
    element:  '#add-job-opening',
    intro:    'You can use the add button to start recruiting campaigns when you\'ve added the appropriate job description.',
    position: 'top'
  }]

  @action
  updateFilter (filter, value) {
    this[filter] = value;
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
