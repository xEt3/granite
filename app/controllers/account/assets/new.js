import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.asset',
  transitionWithModel: true,
  icons:               'mobile tablet desktop laptop car lab configure asterisk cube sound photo'.w(),

  sharableLabel: computed('model.name', function () {
    return this.get('model.name') ? htmlSafe(`Can ${this.get('model.name')} be shared by employees`) : htmlSafe('Can these assets be shared by employees');
  })
});
