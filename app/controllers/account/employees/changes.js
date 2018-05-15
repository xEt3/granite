import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  ajax: service(),

  actions: {
    approveChange (change) {
      if (this.get('working')) {
        return;
      }

      this.ajaxStart();

      this.get('ajax').post(`/api/v1/change/${change.get('id')}/apply`)
        .then(() => {
          this.ajaxSuccess(`Successfully applied ${change.get('changes.length')} changes for ${change.get('employee.firstName')}.`);
          this.send('refresh');
        })
        .catch(this.ajaxError.bind(this));
    },

    rejectChange (change) {
      if (this.get('working')) {
        return;
      }

      change.setProperties({
        approved: false,
        reviewedOn: new Date()
      });

      this.saveModel(change)
        .then(() => {
          this.send('refresh');
        });
    }
  }
});
