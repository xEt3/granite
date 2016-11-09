import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';
import pagination from 'granite/mixins/controller-abstractions/pagination';

const { Controller, inject } = Ember;

export default Controller.extend(ajaxStatus, pagination, {
  auth: inject.service(),

  queryParams: [ 'page', 'asc', 'sortProp' ],
  limit: 20,
  page: 1,
  asc: true,
  sortProp: 'created',
  enableNotify: true
});
