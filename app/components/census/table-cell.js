import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';
import ajaxStatus from 'granite/mixins/ajax-status';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

const CensusTableCellComponent = Component.extend(addEdit, ajaxStatus, {
  classNameBindings: [ 'highlightCell:census__highlight-cell' ],
  tagName:           'td',
  guessedField:      computed('availableFields', 'guesses', 'columnIndex', function () {
    return this.get('availableFields').findBy('path', this.get('guesses')[this.get('columnIndex')]);
  }),

  // validationState: computed('validation.[]', 'columnIndex', 'rowIndex', function () {
  //   return this.get(`validation.${this.get('rowIndex')}.${this.get('columnIndex')}`) || {};
  // }),

  missingRelationship:   computed.reads('validation.missingRelationship'),
  missingRequiredFields: computed.reads('validation.isRequired'),
  highlightCell:         computed.or('missingRelationship', 'missingRequiredFields'),

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

CensusTableCellComponent.reopenClass({ positionalParams: [ 'column', 'rowIndex', 'columnIndex', 'potentialData', 'availableFields', 'guesses', 'validation' ] });

export default CensusTableCellComponent;
