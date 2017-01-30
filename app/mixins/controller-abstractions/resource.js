import Ember from 'ember';
import pagination from 'granite/mixins/controller-abstractions/pagination';

const { Mixin } = Ember;

export default Mixin.create(pagination, {
  queryParams: [ 'page', 'limit' ],
  limit: 20,
  page: 1
});
