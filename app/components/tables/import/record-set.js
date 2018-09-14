import Component from '@ember/component';
import { computed } from '@ember/object';

const RecordSetComponent = Component.extend({
  allSelected: computed('selectedRows.length', 'recordSet.records.length', function () {
    return this.get('selectedRows.length') === this.get('recordSet.records.length');
  })
});

RecordSetComponent.reopenClass({ positionalParams: [ 'recordSet' ] });

export default RecordSetComponent;
