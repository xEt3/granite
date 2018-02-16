import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { Promise } from 'rsvp';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

export default Controller.extend(addEdit, {
  transitionAfterSave: 'account.employee.index',
  transitionWithModel: true,
  noDirtyModelAttributes: computed.not('model.hasDirtyAttributes'),
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
