import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {

  actions: {
    unassignAsset ( asset ) {
      this.get('model').removeObject(asset);

      let assignment = asset.get('assignments').findBy('employee.id', this.get('employee.id'));

      if ( assignment ) {
        this.ajaxStart();
        asset.get('assignments').removeObject(assignment);
        asset.save()
          .then(() => this.ajaxSuccess(null, true))
          .catch(this.ajaxError.bind(this));
      }
    }
  }
});
