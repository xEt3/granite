import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  followUpSort: [ 'created' ],
  sortedFollowUps: computed.sort('model.followUps', 'followUpSort')
});
