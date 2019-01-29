import Component from '@ember/component';

const reportView = Component.extend({
  tagName:    'table',
  classNames: [ 'ui celled table' ]
});

reportView.reopenClass({ positionalParams: [ 'data' ] });

export default reportView;
