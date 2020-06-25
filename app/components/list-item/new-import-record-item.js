import Component from '@glimmer/component';
import { get, action } from '@ember/object';
import {
  recordDisplayPropertyMap,
  modelPageMap
} from 'granite/config/statics';

export default class ListItemNewImportRecordItem extends Component {
  get displayProp () {
    const properties = recordDisplayPropertyMap[this.args.type] || [],
          record = this.args.model;

    return record && properties.map(key => get(record, key)).join(' ');
  }

  get recordRoute () {
    return modelPageMap[this.args.type];
  }

  @action
  linkToRecord () {
    const recordRoute = this.recordRoute,
          id = this.args.model._id;

    if (!recordRoute) {
      return;
    }

    let transitionArgs = [ recordRoute.path ];

    if (!recordRoute.all) {
      transitionArgs.push(id);
    }

    this.args.onTransition(transitionArgs);
  }
}

/*
  USAGE:
  <ListItem::NewImportRecordItem
    @model={{record}}
    @type={{importGroup.name}}
    @onTransition={{this.transitionTo}} />

*/
