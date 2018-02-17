import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  init () {
    this._super(...arguments);
    this.set('selectedNode', this.get('model.firstObject'));
  },

  baseNode: computed('model', 'selectedNode.id', function () {
    return this.makeNode(this.get('selectedNode') || this.get('model.firstObject'));
  }),

  makeNode (object, base = {}) {
    if (!object) {
      return;
    }

    return Object.assign({}, base, {
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
