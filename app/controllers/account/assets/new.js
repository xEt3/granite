import Controller from '@ember/controller';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.asset',
  transitionWithModel: true,
  icons:               'mobile tablet desktop laptop car lab configure asterisk cube sound photo'.w()
});
