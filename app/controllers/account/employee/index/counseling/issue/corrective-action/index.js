import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  followUpSort: [ 'created' ],
  sortedFollowUps: computed.sort('model.followUps', 'followUpSort')
});
