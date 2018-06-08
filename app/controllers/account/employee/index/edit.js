import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { Promise } from 'rsvp';
import Employee from 'granite/models/employee';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

const employeeBelongsTo = [ 'location', 'department', 'supervisor' ];

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.employee.index',
  transitionWithModel: true,
  noDirtyModelAttributes: computed('model.hasDirtyAttributes', 'relationshipsChanged', function () {
    if (this.get('model.hasDirtyAttributes') || this.get('relationshipsChanged')) {
      return false;
    }
    return true;
  }),

  relationshipsChanged: computed(`model.{${employeeBelongsTo.join(',')}}`, 'initialRelationships.[]', function () {
    const initialRelationships = this.get('initialRelationships');
    for (let i = 0; i < initialRelationships.length; i++) {
      if (this.get(`model.${initialRelationships[i].relationshipPath}.id`) !== initialRelationships[i].id) {
        return true;
      }
    }
    return false;
  }),
  
  disabled: computed.or('loading', 'noDirtyModelAttributes'),

  actions: {
    selectEffectiveDate () {
      this.set('responded', false);

      $('#effective-date-modal').modal({
        detachable: true,
        onHidden: () => {
          if ( !this.get('responded') ) {
            this.send('respondEffectiveDateModal', false);
          }
        }
      }).modal('show');

      return new Promise((resolve, reject) => this.setProperties({ resolve, reject }));
    },

    respondEffectiveDateModal ( response ) {
      this.get(response ? 'resolve' : 'reject')();
      this.set('responded', true);
      $('#effective-date-modal').modal('hide');
    }
  }
});
