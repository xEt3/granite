import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  init () {
    this._super(...arguments);
    this.set('selectedNode', this.get('model.firstObject'));
  },

  baseNode: computed('model', 'selectedNode.id', function () {
    return this.makeNode(this.get('selectedNode') || this.get('model.firstObject'));
  }),

  makeNode (object, base = {}) {
    return Ember.$.extend(base, {
      _id: object.get('id'),
      name: {
        first: object.get('firstName'),
        last: object.get('lastName')
      },
      email: object.get('email'),
      supervisor: object.belongsTo('supervisor').id()
    });
  }
});
