import Ember from 'ember';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const { Controller } = Ember;

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.asset',
  transitionWithModel: true,
  icons: 'mobile tablet desktop laptop car lab configure asterisk cube sound photo'.w()
});
