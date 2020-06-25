import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { elementId } from 'granite/core';
import $ from 'jquery';

@elementId
export default class ListItemUserItemComponent extends Component {
  @service store
  @service ajax
  @service data

  @tracked projects = null
  @tracked newOwner = null

  get modalId () {
    return this.elementId + '-modal';
  }

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

  get users () {
    let userId = this.args.user.id,
        allUsers = this.args.allUsers;

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
    let { success, error } = this.data.createStatus('activation');

    try {
      let { actionItem } = await this.ajax.request('/api/v1/action-items', {
        data: {
          owner:       this.args.user.get('employee.id'),
          completedOn: null
        }
      });
      this.projects = actionItem;
      success(null, true);
    } catch (e) {
      error(e);
    }

    $(`#${this.modalId}`).modal({
      detachable:  true,
      showOnFocus: false,
      closable:    false,
      onHidden:    () => {
        this.projects = null;
        this.newOwner = null;
      }
    }).modal('show');
  }

  @action
  async transferProjects () {
    if (this.projects.length === 0) {
      return;
    }
    let { success, error } = this.data.createStatus();
    try {
      await this.ajax.post('/api/v1/action-item/bulk-transfer', {
        data: {
          currentOwner: this.args.user.get('employee.id'),
          newOwner:     this.newOwner
        }
      });
    } catch (e) {
      error(e);
      this.closeTransferModal();
      throw e;
    }
    success('Successfully transferred projects');
  }

  @action
  async toggleInactiveState (val) {
    let user = this.args.user;
    user.inactive = val;

    let { success, error } = this.data.createStatus('activation');
    try {
      await user.save();
    } catch (e) {
      return error(e);
    }

    if (val) {
      this.closeTransferModal();
      success('Successfully deactivated user');
    } else {
      success('Successfully reactivated user');
    }

    this.args.onRefresh();
  }

  @action
  cancel () {
    this.closeTransferModal();
  }
}

/* Usage
  <ListItem::UserItem
  @user={{user}}
  @allUsers={{allUsers}}
  @onRefresh={{route-action 'refreshModel'}}
}}
*/
