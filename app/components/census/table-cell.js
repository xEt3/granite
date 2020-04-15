import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import ajaxStatus from 'granite/mixins/ajax-status';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const CensusTableCellComponent = Component.extend(addEdit, ajaxStatus, {
  classNameBindings: [ 'highlightCell:census__highlight-cell' ],
  tagName:           'td',
  guessedField:      computed('availableFields', 'guesses', 'columnIndex', function () {
    return this.availableFields.findBy('path', this.guesses[this.columnIndex]);
  }),

  missingRelationship:   computed.reads('validation.missingRelationship'),
  missingRequiredFields: computed.reads('validation.isRequired'),
  highlightCell:         computed.or('missingRelationship', 'missingRequiredFields', 'hasEnumInvalidation'),

  hasEnumInvalidation: computed('guessedField.enums.[]', function () {
    let guessedField = this.guessedField;

    if (!guessedField || !guessedField.enums) {
      return false;
    }

    const enums = guessedField.enums,
          enumStr = [ ...enums, enums.indexOf(null) > -1 ? 'or leave this field blank' : null ].filter(Boolean).join(', ');

    let matchingEnum = enums.includes(this.column);

    return matchingEnum ? false : `Please use one of these: ${enumStr}`;
  }),

  popupMessage: computed('missingRelationship', function () {
    let relationship = this.missingRelationship;

    if (relationship === 'department' || relationship === 'location') {
      return htmlSafe(`Could not find this ${relationship},  click to create.`);
    }

    return htmlSafe(`Could not find this ${relationship}.`);
  }),

  actions: {
    addAction () {
      let field = this.guessedField,
          column = this.column,
          actionToCall;

      if (field.path === 'department') {
        actionToCall = this.addDepartment;
      } else if (field.path === 'location') {
        actionToCall = this.addLocation;
      } else {
        return;
      }

      actionToCall(column)
      .then(newRelationshipModel => this.send('save', newRelationshipModel))
      .then(() => this.onRefresh());
    },

    notify (type, msg) {
      this.onNotify(type, msg);
    }
  }
});

CensusTableCellComponent.reopenClass({ positionalParams: [ 'column', 'rowIndex', 'columnIndex', 'potentialData', 'availableFields', 'guesses', 'validation' ] });

export default CensusTableCellComponent;
