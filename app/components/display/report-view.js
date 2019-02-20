import Component from '@ember/component';
import { computed } from '@ember/object';

const reportView = Component.extend({
  tagName:    'table',
  classNames: [ 'ui celled table' ],
  headers:    computed('data', function () {
    return this.get('data')[0];
  }),

  bodyData: computed('data', function () {
    return this.get('data').slice(1);
  })
});

reportView.reopenClass({ positionalParams: [ 'data' ] });

export default reportView;
