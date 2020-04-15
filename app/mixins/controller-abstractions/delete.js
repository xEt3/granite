import Mixin from '@ember/object/mixin';
import AjaxHooks from '../ajax-status';

export default Mixin.create(AjaxHooks, {
  _afterDelete (record) {
    const transitionAfterSave = this.transitionAfterDelete || this.transitionAfterSave;

    if (transitionAfterSave) {
      let transitionArgs = [ transitionAfterSave ];

      if (this.transitionWithModel) {
        transitionArgs.push(record.get(this.getWithDefault('modelIdentifier', 'id')));
      }

      this.transitionToRoute.apply(this, transitionArgs);
    }
  },

  actions: {
    delete (model) {
      console.warn('Mixing in the controller-abstraction for delete is deprecated in favor of extending the granite service: data.');

      const _model = model || this.model;

      if (!_model) {
        return;
      }

      this.ajaxStart();

      _model.destroyRecord().then(record => {
        this.ajaxSuccess('Successfully deleted.');
        this._afterDelete(record);

        if (this.afterSave && typeof this.afterSave === 'function') {
          this.afterSave(record);
        }
      }).catch(this.ajaxError.bind(this));
    }
  }
});
