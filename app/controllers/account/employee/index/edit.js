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
  // noDirtyModelAttributes: computed.not('model.hasDirtyAttributes'),
  noDirtyModelAttributes: computed('model.hasDirtyAttributes', function () {
    console.log('dirty? :', this.get('model.hasDirtyAttributes'));
    return !this.get('model.hasDirtyAttributes');
  }),
  disabled: computed.or('loading', 'noDirtyModelAttributes'),
  // test: computed(`model.{${employeeBelongsTo.join(',')}}`, function () {
  //   console.log('in here');
  // }),

  test: computed(`model.[]`, function () {
    console.log('something changed');
    console.log('models department was:', this.get('currentDepartment'));
    console.log('model now is:', this.get('model.department'));
  }),

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
