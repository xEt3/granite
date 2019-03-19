import Component from '@ember/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import ajaxStatus from 'granite/mixins/ajax-status';
import $ from 'jquery';

let UserItemComponent = Component.extend(ajaxStatus, {
  store: service(),
  ajax:  service(),

  classNames: [ 'item', 'users__user--item' ],
  projects:   null,
  newOwner:   null,

  modalId: computed('elementId', function () {
    return this.get('elementId') + '-modal';
  }),

  dropdownId: computed('elementId', function () {
    return this.get('elementId') + '-dropdown';
  }),

  disableDeactivate: computed('newOwner', 'projects', function () {
    let projects = this.get('projects');

    if (!projects || !projects.length) {
      return false;
    }

    return this.get('newOwner') ? false : true;
  }),

  users: computed('user.id', 'allUsers', function () {
    let userId = this.get('user.id'),
        allUsers = this.get('allUsers');

    return allUsers.reduce((userArray, user) => {
      if (user.id !== userId) {
        let { first, middle, last, suffix } = user.name,
            fullName = '';

        fullName += first;
        fullName += middle ? ' ' + middle : '';
        fullName += ' ' + last;
        fullName += suffix ? ' ' + suffix : '';

        userArray.push({
          fullName,
          employee: user.employee,
          id:       user.id
        });
      }
      return userArray;
    }, []);
  }),

  closeTransferModal () {
    $(`#${this.get('modalId')}`).modal('hide');
  },

  actions: {
    async openTransferModal () {
      this.ajaxStart();
      let { actionItem } = await this.ajax.request('/api/v1/action-items', {
        data: {
          owner:       this.get('user.employee.id'),
          completedOn: null
        }
      });
      this.set('projects', actionItem);
      this.ajaxSuccess(null, true);

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

    async transferProjects () {
      if (this.get('projects.length') === 0) {
        return;
      }

      this.ajaxStart();
      try {
        await this.ajax.post('/api/v1/action-item/bulk-transfer', {
          data: {
            currentOwner: this.get('user.employee.id'),
            newOwner:     this.get('newOwner')
          }
        });
      } catch (e) {
        this.ajaxError(e);
        this.closeTransferModal();
        throw e;
      }

      this.ajaxSuccess('Successfully transferred projects');
    },

    async toggleInactiveState (val) {
      let user = this.get('user');
      user.set('inactive', val);

      this.ajaxStart();
      try {
        await user.save();
      } catch (e) {
        return this.ajaxError(e);
      }

      if (val) {
        this.closeTransferModal();
        this.ajaxSuccess('Successfully deactivated user');
      } else {
        this.ajaxSuccess('Successfully reactivated user');
      }

      this.send('refresh');
    },

    cancel () {
      this.closeTransferModal();
    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    },

    refresh () {
      this.get('onRefresh')();
    }
  }
});

UserItemComponent.reopenClass({ positionalParams: [ 'user', 'allUsers' ] });

export default UserItemComponent;

/* Usage
  {{list-item/user-item
  user
  allUsers
  onNotify=(route-action 'notify')
  onRefresh=(route-action 'refresh')
}}
*/
