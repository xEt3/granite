import Component from '@ember/component';
import { computed } from '@ember/object';

const CensusTableCellComponent = Component.extend({
  hasRelationship: computed('availableFields.[],', 'guesses.[],', 'columnIndex', function () {
    let availableFields = this.get('availableFields'),
        guesses = this.get('guesses'),
        columnIndex = this.get('columnIndex');

    return availableFields.findBy('path', guesses.objectAt(columnIndex)).isRelationship;
  })
});

CensusTableCellComponent.reopenClass({ positionalParams: [ 'column', 'rowIndex', 'columnIndex', 'potentialData', 'availableFields', 'guesses' ] });

export default CensusTableCellComponent;
