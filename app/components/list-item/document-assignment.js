import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ListItemDocumentAssignmentComponent extends Component {
  get isPendingState () {
    let { model } = this.args;
    return model.isLoading || model.isSaving || model.isReloading;
  }

  @action
  checkBoxDisplay () {
    let { model } = this.args;
    if (model.visibleToEmployee) {
      return;
    }

    model.signatureRequired = false;
    model.effectiveOn = null;
  }

  // @action
  // onChange () {
  //   //noop
  // }
}
