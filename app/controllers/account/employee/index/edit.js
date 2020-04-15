import classic from 'ember-classic-decorator';
import { action, computed } from '@ember/object';
import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import $ from 'jquery';

@classic
export default class EditController extends Controller.extend(addEdit) {
  transitionAfterSave = 'account.employee.index';
  transitionWithModel = true;

  @computed(
    'model.{location,department,supervisor,jobDescription}',
    'initialRelationships.[]'
  )
  get relationshipsChanged () {
    const initialRelationships = this.initialRelationships;
    for (let i = 0; i < initialRelationships.length; i++) {
      if (this.get(`model.${initialRelationships[i].relationshipPath}.id`) !== initialRelationships[i].id) {
        return true;
      }
    }
    return false;
  }

  @action
  selectEffectiveDate () {
    this.set('responded', false);

    $('#effective-date-modal').modal({
      detachable: true,
      onHidden:   () => {
        if (!this.responded) {
          this.send('respondEffectiveDateModal', false);
        }
      }
    }).modal('show');

    return new Promise((resolve, reject) => this.setProperties({
      resolve,
      reject
    }));
  }

  @action
  respondEffectiveDateModal (response) {
    this.get(response ? 'resolve' : 'reject')();
    this.set('responded', true);
    $('#effective-date-modal').modal('hide');
  }
}
