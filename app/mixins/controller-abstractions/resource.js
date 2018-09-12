import Mixin from '@ember/object/mixin';
import pagination from 'granite/mixins/controller-abstractions/pagination';

export default Mixin.create(pagination, {
  queryParams: [ 'page', 'limit' ],
  limit:       20,
  page:        1
});
