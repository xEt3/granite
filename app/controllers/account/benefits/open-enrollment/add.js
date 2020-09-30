import Controller from 'granite/core/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';


export const openEnrollmentForm = [{
  label:      'Start',
  inputClass: 'large',
  type:       'date',
  startMode:  'month',
  path:       'start',
  formatter:  {
    header (date) {
      return moment(date).format('MMM');
    },
    date (date) {
      return date.getMonth() + 1 + '/' + date.getDate();
    }
  }
}, {
  label:      'End',
  labelClass: 'date',
  inputClass: 'large',
  type:       'date',
  startMode:  'month',
  path:       'end',
  formatter:  {
    header (date) {
      return moment(date).format('MMM');
    },
    date (date) {
      return date.getMonth() + 1 + '/' + date.getDate();
    }
  }
}];

export default class AddController extends Controller {
  @service data

  afterSaveOptions = { transitionAfterSave: 'account.benefits.open-enrollment' }

  @action
  afterSave () {
    this.send('refreshModel');
  }

  enrollmentForm = openEnrollmentForm

  @action
  cancel () {
    this.model.destroyRecord();
    this.transitionToRoute('account.benefits.open-enrollment');
  }
}
