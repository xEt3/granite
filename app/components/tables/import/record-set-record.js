import Component from '@ember/component';
import { A } from '@ember/array';
import { computed, get } from '@ember/object';
import { modelPageMap } from 'granite/config/statics';
import titleCase from 'granite/utils/title-case';

const RecordSetRecordComponent = Component.extend({
  tagName: 'tr',
  classNames: [ 'import__record' ],
  classNameBindings: [
    'record.duplicate:import__record--duplicate',
    'isSelected:import__record--is-selected'
  ],

  isSelected: computed('selectedRows.[]', 'record.id', function () {
    return (this.get('selectedRows') || []).includes(this.get('record.id'));
  }),

  matchReason: computed('duplicate.matchReason', function () {
    let match = this.get('duplicate.matchReason');

    if (!match) {
      return;
    }

    return A(match.map(m => titleCase([m.split('.')[0]]))).uniq().join(', ');
  }),

  duplicate: computed('fields.[]', 'record.duplicate', 'recordType', function () {
    const duplicate = this.get('record.duplicate'),
          displayField = this.get('fields')[0],
          page = modelPageMap[this.get('recordType')] || {};

    return duplicate && {
      page:        page.path,
      includeId:   !page.all,
      text:        get(duplicate, displayField),
      id:          duplicate._id,
      matchReason: duplicate.matchReason
    };
  }),

  actions: {
    linkToDuplicate () {
      const { page, id, includeId } = this.get('duplicate') || {};

      if (!page) {
        return;
      }

      let transitionArgs = [ page ];

      if (includeId) {
        transitionArgs.push(id);
      }

      this.get('onTransition')(transitionArgs);
    }
  }
});

RecordSetRecordComponent.reopenClass({
  positionalParams: [ 'record', 'selectedRows' ]
});

export default RecordSetRecordComponent;
