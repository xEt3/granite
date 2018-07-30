import BaseLiComponent from './base';
import { computed, get } from '@ember/object';
import {
  recordDisplayPropertyMap,
  modelPageMap
} from 'granite/config/statics';

export default BaseLiComponent.extend({
  tagName: '',

  displayProp: computed('model', 'type', function () {
    const properties = recordDisplayPropertyMap[this.get('type')] || [],
          record = this.get('model');

    return record && properties.map(key => get(record, key)).join(' ');
  }),

  recordRoute: computed('type', function () {
    return modelPageMap[this.get('type')];
  }),

  linkToRecord () {
    const recordRoute = this.get('recordRoute'),
          id = this.get('model._id');

    if (!recordRoute) {
      return;
    }

    let transitionArgs = [ recordRoute.path ];

    if (!recordRoute.all) {
      transitionArgs.push(id);
    }

    this.get('onTransition')(transitionArgs);
  }
});
