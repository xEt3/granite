import Controller from '@ember/controller';
import pagination from 'granite/mixins/controller-abstractions/pagination';
import del from 'granite/mixins/controller-abstractions/delete';

export default Controller.extend(pagination, del, {
  queryParams: [ 'page' ],
  limit: 10,

  actions: {
    toggleProperty ( prop ) {
      this.toggleProperty(prop);
    }
  }
});
