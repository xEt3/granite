import Ember from 'ember';
import pagination from 'granite/mixins/controller-abstractions/pagination';

const { Controller } = Ember;

export default Controller.extend(pagination, {
  queryParams: [ 'page' ],
  limit: 20
});
