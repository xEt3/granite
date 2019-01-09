import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import ajaxStatus from 'granite/mixins/ajax-status';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const CensusTableCellComponent = Component.extend(addEdit, ajaxStatus, {
  didReceiveAttrs () {
    let validity = this.get('missingRelationship') || this.get('missingRequiredFields') ? true : false;

    if (validity !== this.get('isInvalid') && this.get('onValidationChange')) {
      this.get('onValidationChange')(this.get('columnIndex'), validity);
    }

    this.set('isInvalid', validity);
  },

  guessedField: computed('availableFields', 'guesses', 'columnIndex', function () {
    return this.get('availableFields').findBy('path', this.get('guesses')[this.get('columnIndex')]);
  }),

  missingRelationship: computed('availableFields.[],', 'guesses.[],', 'columnIndex', 'rowIndex', 'potentialData', 'column', function () {
    let guessForCell = this.get('guesses')[this.get('columnIndex')],
        potentialDataForCell = this.get('potentialData')[this.get('rowIndex')][guessForCell],
        field = this.get('guessedField'),
        column = this.get('column');

    //if cell is a relationship cell, and cell has a value in it, and the potentialDataForCell is undefined
    return field.isRelationship && column && !potentialDataForCell ? field.path : null;
  }),

  missingRequiredFields: computed('availableFields.[],', 'guesses', 'columnIndex', 'column', function () {
    let guessForCell = this.get('guesses')[this.get('columnIndex')],
        column = this.get('column'),
        missingFields = false;

    this.get('availableFields').forEach(field => {
      if (field.required && !column && field.path === guessForCell) {
        missingFields = true;
      }
    });

    return missingFields;
  }),

  popupMessage: computed('missingRelationship', function () {
    let relationship = this.get('missingRelationship');
    return htmlSafe(`Could not find this ${relationship},  click to create.`);
  }),

  actions: {
    addAction () {
      let field = this.get('guessedField'),
          column = this.get('column'),
          actionToCall;

      if (field.path === 'department') {
        actionToCall = this.get('addDepartment');
      } else if (field.path === 'location') {
        actionToCall = this.get('addLocation');
      } else {
        return;
      }

      actionToCall(column)
      .then(newRelationshipModel => this.send('save', newRelationshipModel))
      .then(() => this.get('onRefresh')());
    },

    notify (type, msg) {
      this.get('onNotify')(type, msg);
    }
  }
});

CensusTableCellComponent.reopenClass({ positionalParams: [ 'column', 'rowIndex', 'columnIndex', 'potentialData', 'availableFields', 'guesses' ] });

export default CensusTableCellComponent;
