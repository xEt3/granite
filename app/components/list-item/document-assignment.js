import BaseLiComponent from './base';
import { action } from '@ember/object';

export default class ListItemDocumentAssignmentComponent extends BaseLiComponent {
  onChange = this.args.onChange;
  get isPendingState () {
    let { model } = this.args;
    return model.isLoading || model.isSaving || model.isReloading;
  }
  // isPendingState: or('model.isLoading', 'model.isSaving', 'model.isReloading'),

  @action
  checkBoxDisplay () {
    let model = this.model;

    if (model.visibleToEmployee) {
      return;
    }
    model.setProperties({
      signatureRequired: false,
      effectiveOn:       null
    });
  }

  // @action
  // onChange () {
  //   //noop
  // }
}
