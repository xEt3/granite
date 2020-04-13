import { action } from '@ember/object';
import { Promise } from 'rsvp';
import $ from 'jquery';

export default function modalSupport (constructor) {
  return class ModalSupportClass extends constructor {
    @action
    openModal (id, key) {
      $(`#${id}`)
      .modal({
        detachable: true,
        context:    '.ember-application',
        onHidden:   () => {
          if (!this.get(`${key}Responded`)) {
            this.get(`${key}Promise.reject`)();
          }
        }
      })
      .modal('show');

      return new Promise((resolve, reject) => this.set(`${key}Promise`, {
        resolve,
        reject
      }));
    }

    @action
    modalResponse (prefix, response) {
      const promise = this.get(`${prefix}Promise`);
      this.set(`${prefix}Responded`, true);
      return promise[response ? 'resolve' : 'reject'](response);
    }
  };
}
