import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';
import { closeMessageMap } from 'granite/config/statics';

const { Controller, inject: { service }, computed } = Ember;

export default Controller.extend(addEdit, del, {
  auth: service(),
  transitionAfterDelete: 'account.recruiting.index.index',
  transitionWithModel: false,

  confirmCloseMessage: computed('model.{sendCloseNotice,allocateTalentPool}', function () {
    if (!this.get('model')) {
      return;
    }

    const settingProps = this.get('model').getProperties('sendCloseNotice', 'allocateTalentPool');
    const messages = Object.keys(settingProps).reduce((msg, key, index, all) => {
      if (settingProps[key] && closeMessageMap[key]) {
        msg.push(`${all.length > 1 && index === all.length - 1 ? 'and ' : ''}${closeMessageMap[key]}`);
      }

      return msg;
    }, []);

    return messages.length > 0 ?
      `${closeMessageMap.prefix} ${messages.join(', ')}. ${closeMessageMap.default}` :
      closeMessageMap.default;
  }),

  actions: {
    close () {
      const model = this.get('model');
      model.set('closed', true);
      this.saveModel(model);
    }
  }
});
