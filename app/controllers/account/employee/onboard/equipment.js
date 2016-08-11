import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  actions: {
    selectAsset ( asset ) {
      this.get('assignedAssets').addObject(asset);
    }
  }
});
