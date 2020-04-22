import Component from '@glimmer/component';
import { computed, action } from '@ember/object';
import { htmlSafe } from '@ember/string';
import { inject as service } from '@ember/service';

export default class CensusTableCellComponent extends Component {
  @service data

  @computed.reads('args.validation.missingRelationship') missingRelationship
  @computed.reads('args.validation.isRequired') missingRequiredFields
  @computed.or('missingRelationship', 'missingRequiredFields', 'hasEnumInvalidation') highlightCell

  get guessedField () {
    return this.args.availableFields.findBy('path', this.args.guesses[this.args.columnIndex]);
  }

  get hasEnumInvalidation ()  {
    let guessedField = this.guessedField;

    if (!guessedField || !guessedField.enums) {
      return false;
    }

    const enums = guessedField.enums,
          enumStr = [ ...enums, enums.indexOf(null) > -1 ? 'or leave this field blank' : null ].filter(Boolean).join(', ');

    let matchingEnum = enums.includes(this.column);

    return matchingEnum ? false : `Please use one of these: ${enumStr}`;
  }

  get popupMessage () {
    let relationship = this.missingRelationship;

    if (relationship === 'department' || relationship === 'location') {
      return htmlSafe(`Could not find this ${relationship},  click to create.`);
    }

    return htmlSafe(`Could not find this ${relationship}.`);
  }

  @action
  async addAction () {
    let field = this.guessedField,
        column = this.args.column,
        actionToCall;

    if (field.path === 'department') {
      actionToCall = this.args.addDepartment;
    } else if (field.path === 'location') {
      actionToCall = this.args.addLocation;
    } else {
      return;
    }

    let newRelationshipModel = await actionToCall(column);
    await this.data.saveRecord(newRelationshipModel);
    this.args.onRefresh();
  }

  @action
  notify (type, msg) {
    this.args.onNotify(type, msg);
  }
}

// CensusTableCellComponent.reopenClass({ positionalParams: [ 'column', 'rowIndex', 'columnIndex', 'potentialData', 'availableFields', 'guesses', 'validation' ] });
//
// export default CensusTableCellComponent;
