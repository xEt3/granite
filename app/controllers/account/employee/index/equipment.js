import Ember from 'ember';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Ember.Controller.extend(ajaxStatus, {

  actions: {
    unassignAsset ( asset ) {
      this.get('model').removeObject(asset);

      let assignment = asset.get('assignments').findBy('employee.id', this.get('employee.id'));
console.log('assignment', assignment);
      if ( assignment ) {
        this.ajaxStart();
        asset.get('assignments').removeObject(assignment);
console.log(asset.get('assignments'), 'asset.get');
        asset.save()
        .then(() => this.ajaxSuccess(null, true))
        .catch(this.ajaxError.bind(this));
      }
    }
  }
});
