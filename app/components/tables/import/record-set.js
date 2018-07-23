import Component from '@ember/component';
import { computed } from '@ember/object';

const RecordSetComponent = Component.extend({
    return this.get('selectedRows.length') === this.get('recordSet.records.length');
  })
});

RecordSetComponent.reopenClass({
  positionalParams: [ 'recordSet' ]
});

export default RecordSetComponent;
