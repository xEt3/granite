import Component from '@glimmer/component';
import { A } from '@ember/array';
import { get, action } from '@ember/object';
import { modelPageMap } from 'granite/config/statics';
import titleCase from 'granite/utils/title-case';

export default class TablesImportRecordSetRecordComponent extends Component {
  get isSelected () {
    return (this.args.selectedRows || []).includes(this.args.record.id);
  }

  get matchReason () {
    let match = this.duplicate.matchReason;

    if (!match) {
      return;
    }

    return A(match.map(m => titleCase([ m.split('.')[0] ]))).uniq().join(', ');
  }

  get duplicate () {
    const duplicate = this.args.record.duplicate,
          displayField = this.args.fields[0],
          page = modelPageMap[this.args.recordType] || {};

    return duplicate && {
      page:        page.path,
      includeId:   !page.all,
      text:        get(duplicate, displayField),
      id:          duplicate._id,
      matchReason: duplicate.matchReason
    };
  }

  @action
  linkToDuplicate () {
    const { page, id, includeId } = this.duplicate || {};

    if (!page) {
      return;
    }

    let transitionArgs = [ page ];

    if (includeId) {
      transitionArgs.push(id);
    }

    this.args.onTransition(transitionArgs);
  }
}

// RecordSetRecordComponent.reopenClass({ positionalParams: [ 'record', 'selectedRows' ] });

// export default RecordSetRecordComponent;
