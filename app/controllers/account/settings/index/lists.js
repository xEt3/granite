import Controller from '@ember/controller';

export default Controller.extend({
  queryParams: [ 'list' ],
  tempList:    [ 1, 2, 3, 4 ],
  list:        [],

  actions: {
    toggleList (list) {
      this.setProperties({ list });
    }
  }
});
