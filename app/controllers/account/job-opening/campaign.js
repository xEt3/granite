import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { closeMessageMap } from 'granite/config/statics';

export default class AccountJobOpeningCampaignController extends Controller {
  @service auth
  @service data

  deleteOptions = {
    transitionAfterDelete: 'account.recruiting.index.index',
    transitionWithModel:   false
  }

  get confirmCloseMessage () {
    if (!this.model) {
      return null;
    }

    const settingProps = this.model.getProperties('sendCloseNotice', 'allocateTalentPool');
    const messages = Object.keys(settingProps).reduce((msg, key, index, all) => {
      if (settingProps[key] && closeMessageMap[key]) {
        msg.push(`${all.length > 1 && index === all.length - 1 ? 'and ' : ''}${closeMessageMap[key]}`);
      }

      return msg;
    }, []);

    return messages.length > 0 ?
      `${closeMessageMap.prefix} ${messages.join(', ')}. ${closeMessageMap.default}` :
      closeMessageMap.default;
  }

  @action
  close () {
    this.model.closed = true;
    if (!this.model.completedOn) {
      this.model.completedOn = new Date();
    }

    this.data.saveRecord(this.model);
  }
}
