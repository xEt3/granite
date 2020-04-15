import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
class RecordSetComponent extends Component {
  @computed('selectedRows.length', 'recordSet.records.length')
  get allSelected () {
    return this.get('selectedRows.length') === this.get('recordSet.records.length');
  }
}

RecordSetComponent.reopenClass({ positionalParams: [ 'recordSet' ] });

export default RecordSetComponent;
