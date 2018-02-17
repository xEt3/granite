import Controller from '@ember/controller';
import pagination from 'granite/mixins/controller-abstractions/pagination';

export default Controller.extend(pagination, {
  queryParams: [ 'page' ],
  limit: 20
});
