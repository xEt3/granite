import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import elementId from 'granite/core/element-id';
import $ from 'jquery';

@elementId
export default class ModalBaseComponent extends Component {
  @tracked modalId = ''

  get openModalFn () {
    return (this.openModal || this.dispatchSemanticModal).bind(this);
  }

  dispatchSemanticModal () {
    this.getModalById().modal({
      detachable: true,
      closable:   false,
      onHidden:   () => {
        if (!this || this.isDestroyed || this.isDestroying) {
          return this.getModalById().remove();
        }

        // this.getModalById().appendTo(this.element);
      },
      context: '.ember-application'
    }).modal('show');
  }

  willDestroy () {
    const $modal = this.getModalById();
    $modal.modal('hide');
    $modal.remove();
  }

  getModalById () {
    return $(`#${this.modalId}`);
  }

  @action
  respond (response) {
    const modalId = this.modalId;
    // Bubble response
    let ret = this.onResponse?.(response);
    // Either way close the modal
    if (ret && ret.finally) {
      return ret.finally(() => {
        $(`#${modalId}`).modal('hide');
      });
    }

    $(`#${modalId}`).modal('hide');
  }
}
