import Controller from '@ember/controller';
import pagination from 'granite/mixins/controller-abstractions/pagination';

export default Controller.extend(pagination, {
  queryParams: [ 'page' ],
  limit:       10,

  actions: {
    toggleProperty (prop) {
      this.toggleProperty(prop);
    },

    transitionToProject (title) {
      // IF LINK IS STRIPPED IN COMPONENT, THIS IS NOT NEEDED
      this.transitionToRoute('account.action-item', title);
    }
  }
});
