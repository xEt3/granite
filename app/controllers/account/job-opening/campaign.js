import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';
import { closeMessageMap } from 'granite/config/statics';

@classic
export default class CampaignController extends Controller.extend(addEdit, del) {
  @service auth;

  transitionAfterDelete = 'account.recruiting.index.index';
  transitionWithModel = false;

  @computed('model.{sendCloseNotice,allocateTalentPool}')
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
    const model = this.model;
    model.set('closed', true);
    if (!model.completedOn) {
      model.set('completedOn', new Date());
    }

    this.saveModel(model);
  }
}
