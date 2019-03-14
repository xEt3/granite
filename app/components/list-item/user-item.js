import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

let UserItemComponent = Component.extend(ajaxStatus, addEdit, {
  store: service(),

  classNames: [ 'item', 'users__user--item' ],
  projects:   null,

  confirmDeactivateText: computed('user.fullName', function () {
    return htmlSafe(`Are you sure you want to deactivate ${this.get('user.fullName')}`);
  }),

  closeTransferModal () {
    $('#modal__transfer-projects').modal('hide');
  },

  actions: {
    async transferProjects () {
      this.ajaxStart();
      this.set('projects', await this.store.query('action-item', { owner: this.get('user.employee.id') }));
      this.ajaxSuccess('', true);

      $('#modal__transfer-projects').modal({
        detachable: true,
        closable:   false,
        onHidden:   () => {
          this.setProperties({ projects: null });
        }
      }).modal('show');
    },

    async toggleInactiveState (val) {
      let user = this.get('user');
      user.set('inactive', val);

      await this.saveModel(user);

      if (val) {
        this.closeTransferModal();
      }
    },

    cancel () {
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
