import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(ajaxStatus, pagination, addEdit, {
  auth: service(),

  queryParams:  [ 'page', 'asc', 'sortProp' ],
  limit:        20,
  page:         1,
  asc:          true,
  sortProp:     'created',
  enableNotify: true
});
