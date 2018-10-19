import BaseLiComponent from '../list-item/base';
import { computed } from '@ember/object';

const modelFieldMap = {
  employee: {
    title:       'fullName',
    description: 'jobTitle'
  },
  department: { title: 'name' },
  location:   {
    title:       'name',
    description: 'addressLine1'
  }
};

export default BaseLiComponent.extend({
  classNames: [
    'search__result-item'
  ],

  classNameBindings: [ 'modelClass' ],

  modelClass: computed('model.constructor.modelName', function () {
    return `search__result-item--${this.get('model.constructor.modelName')}`;
  }),

  modelName: computed.reads('model.constructor.modelName'),

  isEmployee: computed.equal('modelName', 'employee'),

  properties: computed('modelName', 'model', function () {
    let model = this.get('model');
    let modelName = this.get('modelName');
    if (!modelName) {
      return {};
    }
    let { title, description } = modelFieldMap[modelName] || {};
    return {
      title:       title && model.get(title),
      description: description && model.get(description)
    };
  })
});
