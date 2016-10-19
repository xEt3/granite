import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller, computed, inject } = Ember;

export default Controller.extend(addEdit, {
  auth: inject.service(),

  userTodos: computed('auth.user.employee.id', 'model.checklist.@each.assignedTo.id', function () {
    let checklist = this.get('model.checklist');
    return checklist ? checklist.filterBy('assignedTo.id', this.get('auth.user.employee.id')) : [];
  }),

  actions: {
    /*
      Your implementation should hook to `onStatusChange` and do the following:
       1. Set `completedBy`, `completedOn` **if** action indicates a status change to *complete*
       2. Unset `completedBy`, `completedOn` **if** action indicates a status change to *incomplete*
       3. Save the action item model
    */
    // changeCompletedStatus() {
    //   if(!completedOn) {
    //     this.setProperties({
    //       completedBy: this.get('auth.user.employee',
    //       // completedOn: new Date()
    //     })
    //   }
    // }
  }
});
