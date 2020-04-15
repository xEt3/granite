import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import BaseLiComponent from './base';
import { get, computed } from '@ember/object';
import {
  recordDisplayPropertyMap,
  modelPageMap
} from 'granite/config/statics';

@classic
@tagName('')
export default class NewImportRecordItem extends BaseLiComponent {
  @computed('model', 'type')
  get displayProp () {
    const properties = recordDisplayPropertyMap[this.type] || [],
          record = this.model;

    return record && properties.map(key => get(record, key)).join(' ');
  }

  @computed('type')
  get recordRoute () {
    return modelPageMap[this.type];
  }

  linkToRecord () {
    const recordRoute = this.recordRoute,
          id = this.get('model._id');

    if (!recordRoute) {
      return;
    }

    let transitionArgs = [ recordRoute.path ];

    if (!recordRoute.all) {
      transitionArgs.push(id);
    }

    this.onTransition(transitionArgs);
  }
}
