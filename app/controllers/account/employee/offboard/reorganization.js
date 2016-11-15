import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  baseNode: computed('model', function () {
    let model = this.get('model');

    return {
      _id: model.get('id'),
      name: {
        first: model.get('firstName'),
        last: model.get('lastName')
      },
      email: model.get('email')
    };
  })
});
