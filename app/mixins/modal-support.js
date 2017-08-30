import Ember from 'ember';

const { RSVP: { Promise } } = Ember;

export default Ember.Mixin.create({
  openModal (id, key) {
    Ember.$(`#${id}`)
    .modal({
      detachable: true,
      onHidden: () => {
        if ( !this.get(`${key}Responded`) ) {
          this.get(`${key}Promise.reject`)();
        }
      }
    })
    .modal('show');

    return new Promise((resolve, reject) => this.set(`${key}Promise`, { resolve, reject }));
  },

  modalResponse (prefix, response) {
    const promise = this.get(`${prefix}Promise`);

    this.set(`${prefix}Responded`, true);
    promise[response ? 'resolve' : 'reject'](response);
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
