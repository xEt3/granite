import Controller from '@ember/controller';
import ajaxStatus from 'granite/mixins/ajax-status';

export default Controller.extend(ajaxStatus, {
  actions: {
    submit ( nonce ) {
      const model = this.get('model');

      this.ajaxStart();

      model.save()
      .then(company => {
        var paymentMethod = this.store.createRecord('payment-method', { nonce, company });
        return paymentMethod.save();
      })
      .then(() => {
        this.ajaxSuccess();
        this.transitionToRoute('signup.finish');
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});
