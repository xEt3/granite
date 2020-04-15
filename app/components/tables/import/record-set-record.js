import classic from 'ember-classic-decorator';
import { classNames, classNameBindings, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { A } from '@ember/array';
import { get, action, computed } from '@ember/object';
import { modelPageMap } from 'granite/config/statics';
import titleCase from 'granite/utils/title-case';

@classic
@tagName('tr')
@classNames('import__record')
@classNameBindings(
  'record.duplicate:import__record--duplicate',
  'isSelected:import__record--is-selected'
)
class RecordSetRecordComponent extends Component {
  @computed('selectedRows.[]', 'record.id')
  get isSelected() {
    return (this.selectedRows || []).includes(this.get('record.id'));
  }

  @computed('duplicate.matchReason')
  get matchReason() {
    let match = this.get('duplicate.matchReason');

    if (!match) {
      return;
    }

    return A(match.map(m => titleCase([ m.split('.')[0] ]))).uniq().join(', ');
  }

  @computed('fields.[]', 'record.duplicate', 'recordType')
  get duplicate() {
    const duplicate = this.get('record.duplicate'),
          displayField = this.fields[0],
          page = modelPageMap[this.recordType] || {};

    return duplicate && {
      page:        page.path,
      includeId:   !page.all,
      text:        get(duplicate, displayField),
      id:          duplicate._id,
      matchReason: duplicate.matchReason
    };
  }

  @action
  linkToDuplicate() {
    const { page, id, includeId } = this.duplicate || {};

    if (!page) {
      return;
    }

    let transitionArgs = [ page ];

    if (includeId) {
      transitionArgs.push(id);
    }

    this.onTransition(transitionArgs);
  }
}

RecordSetRecordComponent.reopenClass({ positionalParams: [ 'record', 'selectedRows' ] });

export default RecordSetRecordComponent;
