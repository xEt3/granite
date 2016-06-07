import Ember from 'ember';
import AjaxHooks from '../ajax-status';

export default Ember.Mixin.create(AjaxHooks, {
  actions: {
    delete ( model ) {
      const _model = model || this.get('model');

      if ( !_model ) {
        return;
      }

      this.ajaxStart();

      _model.destroyRecord().then(() => {
        this.ajaxSuccess('Successfully deleted.');
      }).catch(this.ajaxError.bind(this));
    }
  }
});
