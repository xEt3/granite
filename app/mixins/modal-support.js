import Mixin from '@ember/object/mixin';
import { Promise } from 'rsvp';
import $ from 'jquery';

export default Mixin.create({
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
  },

  modalResponse (prefix, response) {
    const promise = this.get(`${prefix}Promise`);

    this.set(`${prefix}Responded`, true);
    return promise[response ? 'resolve' : 'reject'](response);
  },

  actions: {
    openModal () {
      this.openModal(...arguments);
    },
    modalResponse () {
      this.modalResponse(...arguments);
    }
  }
});
