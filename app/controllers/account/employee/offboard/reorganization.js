import Controller from '@ember/controller';
import { computed } from '@ember/object';
import $ from 'jquery';

export default Controller.extend({
  baseNode: computed.or('replacementNode', 'originalNode'),

  originalNode: computed('model', function () {
    return this.makeNode(this.get('model'), { deprecating: true });
  }),

  replacementNode: computed('replacement', function () {
    return this.get('replacement') ? this.makeNode(this.get('replacement'), { simulate: true }) : false;
  }),

  makeNode (object, base = {}) {
    return $.extend(base, {
      _id: object.get('id'),
      name: {
        first: object.get('firstName'),
        last: object.get('lastName')
      },
      email: object.get('email'),
      supervisor: object.belongsTo('supervisor').id()
    });
  },

  actions: {
    saveAndContinue () {
      return this.get('target').send('saveAndContinue');
    }
  }
});
