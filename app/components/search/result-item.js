import BaseLiComponent from '../list-item/base';
import { computed, get } from '@ember/object';

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

const itemProperty = (property) =>
  computed('modelName', 'model', property, function () {
    let model = this.get('model'),
        modelName = this.get('modelName');

    if (!modelName) {
      return null;
    }

    if (this.get(property)) {
      return this.get(property);
    }

    let propertyMap = modelFieldMap[modelName][property];
    return propertyMap && get(model, propertyMap);
  });

export default BaseLiComponent.extend({
  classNames:        [ 'search__result-item' ],
  classNameBindings: [ 'modelClass' ],
  modelName:         computed.reads('model.constructor.modelName'),
  isEmployee:        computed.equal('modelName', 'employee'),
  _title:            itemProperty('title'),
  _description:      itemProperty('description'),

  modelClass: computed('modelName', function () {
    return `search__result-item--${this.get('modelName')}`;
  })
});
