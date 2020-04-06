import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class ListItemDocumentAssignmentComponent extends Component {
  model = this.args.model

  get isPendingState () {
    return this.model.isLoading || this.model.isSaving || this.model.isReloading;
  }

  @action
  checkBoxDisplay () {
    if (this.model.visibleToEmployee) {
      return;
    }

    this.model.signatureRequired = false;
    this.model.effectiveOn = null;
  }

  // @action
  // onChange () {
  //   //noop
  // }
}
