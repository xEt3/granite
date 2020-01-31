import Controller from '@ember/controller';
import { computed } from '@ember/object';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(del, {
  followUpSort:    [ 'created' ],
  sortedFollowUps: computed.sort('model.followUps', 'followUpSort')
});
