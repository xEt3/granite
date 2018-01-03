import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

const { Controller, inject: { service } } = Ember;

export default Controller.extend(addEdit, del, {
  auth: service(),
  transitionAfterDelete: 'account.recruiting.job-descriptions',
  transitionWithModel: false,

  actions: {
    createCampaign () {
      this.ajaxStart();

      let job = this.get('model'),
          creator = this.get('auth.user'),
          jobOpening = this.store.createRecord('job-opening', { job, creator });

      jobOpening.save()
      .then(record => {
        this.transitionToRoute('account.job-opening.setup', record.get('id'));
      })
      .catch(this.ajaxError.bind(this));
    }
  }
});