import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@ember/component';
import ajaxStatus from 'granite/mixins/ajax-status';
import $ from 'jquery';

@classic
@classNames('item', 'users__user--item')
class UserItemComponent extends Component.extend(ajaxStatus) {
  @service
  store;

  @service
  ajax;

  @tracked projects = null;
  @tracked newOwner = null;

  @computed('elementId')
  get modalId () {
    return this.elementId + '-modal';
  }

  @computed('elementId')
  get dropdownId () {
    return this.elementId + '-dropdown';
  }

  get disableDeactivate () {
    let projects = this.projects;

    if (!projects || !projects.length) {
      return false;
    }

    return this.newOwner ? false : true;
  }

  @computed('user.id', 'allUsers')
  get users () {
    let userId = this.get('user.id'),
        allUsers = this.allUsers;

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
  }

  closeTransferModal () {
    $(`#${this.modalId}`).modal('hide');
  }

  @action
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

    $(`#${this.modalId}`).modal({
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
  }

  @action
  async transferProjects () {
    if (this.get('projects.length') === 0) {
      return;
    }

    this.ajaxStart();
    try {
      await this.ajax.post('/api/v1/action-item/bulk-transfer', {
        data: {
          currentOwner: this.get('user.employee.id'),
          newOwner:     this.newOwner
        }
      });
    } catch (e) {
      this.ajaxError(e);
      this.closeTransferModal();
      throw e;
    }

    this.ajaxSuccess('Successfully transferred projects');
  }

  @action
  async toggleInactiveState (val) {
    let user = this.user;
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
  }

  @action
  cancel () {
    this.closeTransferModal();
  }

  @action
  notify (type, msg) {
    this.onNotify(type, msg);
  }

  @action
  refresh () {
    this.onRefresh();
  }
}

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
