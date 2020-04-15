import BaseLiComponent from '../list-item/base';
import { computed, get } from '@ember/object';
import { inject as service } from '@ember/service';
import uriForModel from 'granite/utils/uri-for-model';

const modelFieldMap = {
  employee: {
    title:       'fullName',
    description: 'jobTitle',
    _id:         '_id',
    picture:     'picture'
  },
  department: {
    title: 'name',
    _id:   '_id'
  },
  location: {
    title:       'name',
    description: 'addressLine1',
    _id:         '_id'
  }
};

const itemProperty = (property) =>
  computed('modelName', 'model', property, function () {
    let model = this.model,
        modelName = this.modelName;

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
  router:            service(),
  tagName:           'a',
  href:              '#',
  attributeBindings: [ 'href' ],
  classNames:        [ 'search__result-item', 'item' ],
  classNameBindings: [ 'modelClass' ],
  modelName:         computed.reads('model.constructor.modelName'),
  isEmployee:        computed.equal('modelName', 'employee'),

  _title:       itemProperty('title'),
  _description: itemProperty('description'),
  __id:         itemProperty('_id'),
  _picture:     itemProperty('picture'),

  modelClass: computed('modelName', function () {
    return `search__result-item--${this.modelName}`;
  }),

  click (e) {
    e.preventDefault();

    const result = this.resultItem,
          router = this.router;

    router.transitionTo.apply(router, uriForModel(result));
  }
});
