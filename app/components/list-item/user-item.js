import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import ajaxStatus from 'granite/mixins/ajax-status';
// import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

let UserItemComponent = Component.extend(ajaxStatus, /*addEdit,*/ {
  classNames: [ 'item', 'users__user--item' ],

  confirmDeactivateText: computed('user.fullName', function () {
    return htmlSafe(`Are you sure you want to deactivate ${this.get('user.fullName')}`);
  }),

  closeTransferModal () {
    console.log('inside closeTransferModal');
    $('#modal__transfer-projects').modal('hide');
  },

  actions: {
    transferProjects () {
      $('#modal__transfer-projects').modal({
        detachable: true,
        closable:   false,
        onHidden:   () => {
          //needed?
        }
      }).modal('show');
    },

    //COMBINE DE/REACTIVATION METHODS
    async deactivateUser () {
      console.log('inside deactivateUser');
      let user = this.get('user');
      user.set('inactive', true);

      this.ajaxStart();
      let savedUser = await user.save()
      .catch(e => {
        console.log('error:', e);
      });

      this.ajaxSuccess(`Successfully deactivated ${savedUser.fullName}`);

      this.closeTransferModal();
    },

    async reactivateUser () {
      console.log('inside reactivateUser');
      let user = this.get('user');

      user.set('inactive', false);

      this.ajaxStart();
      let savedUser = await user.save();
      this.ajaxSuccess(`Successfully reactivated ${savedUser.fullName}`);
    },

    cancel () {
      console.log('inside cancel');
      this.closeTransferModal();
    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    }
  }
});

UserItemComponent.reopenClass({ positionalParams: [ 'user' ] });

export default UserItemComponent;

/* Usage
  {{list-item/user-item user}}
*/
