import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

let UserItemComponent = Component.extend(ajaxStatus, addEdit, {
  store: service(),
  ajax:  service(),

  classNames: [ 'item', 'users__user--item' ],
  projects:   null,
  newOwner:   null,

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  test: computed('elementId', function () {
    return this.get('elementId') + '-dropdown';
  }),

  confirmDeactivateText: computed('user.fullName', function () {
    return htmlSafe(`Are you sure you want to deactivate ${this.get('user.fullName')}`);
  }),

  users: computed('allUsers', 'user.id', function () {
    let userId = this.get('user.id');
    let allUsers = this.get('allUsers');
    return allUsers.reduce((userArray, user) => {
      if (user.id !== userId) {
        let { first, middle, last, suffix } = user.name,
            fullName = '';

        fullName += first;
        fullName += middle ? ' ' + middle : '';
        fullName += ' ' + last;
        fullName += suffix ? ' ' + suffix : '';

        userArray.push({
          //FIND EMPLOYEE FOR USER?
          fullName,
          id: user.id
        });
      }
      return userArray;
    }, []);
  }),

  closeTransferModal () {
    $(`#${this.get('modalId')}`).modal('hide');
  },

  actions: {
    async transferProjects () {
      //CHANGE TO AJAX.REQUEST INSTEAD OF USING STORE
      this.ajaxStart();
      this.set('projects', await this.store.query('action-item', { owner: this.get('user.employee.id') }));
      this.ajaxSuccess('', true);

      $(`#${this.get('modalId')}`).modal({
        detachable:  true,
        showOnFocus: false,
        closable:    false,
        onHidden:    () => {
          this.setProperties({
            projects: null,
            newOwner: null
          });
        }
      }).modal('show');
    },

    // MAKE FUNCTION FOR SAVING PROJECTS W/ API CALL

    async toggleInactiveState (val) {
      let user = this.get('user');
      user.set('inactive', val);

      await this.saveModel(user);

      if (val) {
        this.closeTransferModal();
      }
    },

    transition (title) {
      //NEEDS WORK
      this.closeTransferModal();
      this.get('transitionToProject')(title);
    },

    cancel () {
      this.closeTransferModal();
    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    }
  }
});

UserItemComponent.reopenClass({ positionalParams: [ 'user', 'allUsers' ] });

export default UserItemComponent;

/* Usage
  {{list-item/user-item user}}
*/
