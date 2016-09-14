import Ember from 'ember';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import del from 'granite/mixins/controller-abstractions/delete';


const { Controller, computed, inject } = Ember;

export default Controller.extend(pagination, del, {
  application: inject.controller(),
  addingDepartment: computed.equal('application.currentPath', 'account.anatomy.department.new'),
  queryParams: [ 'page' ],
  limit: 20,

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
