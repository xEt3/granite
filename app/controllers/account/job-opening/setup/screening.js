import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class AccountJobOpeningSetupScreeningController extends Controller {
  @service data
  @tracked showingPreview
  enableModelValidations = true

  get sortGroupClass () {
    return `ui middle aligned divided list screening__form-elements ${this.showingPreview ? 'screening__form-elements--preview' : ''}`;
  }

  @action
  afterSave () {
    let form = this.form,
        removeDuplicates = [];

    form.elements.forEach(e => {
      if (!e.id) {
        e.destroy();
        removeDuplicates.push(e);
      }
    });
    form.elements.removeObjects(removeDuplicates);
  }

  @action
  addFormElement () {
    let formElement = this.store.createRecord('form-element', {});
    this.form.elements.pushObject(formElement);
  }

  @action
  deleteFormElement (element) {
    this.form.elements.removeObject(element);
  }

  @action
  reorderElements (elements) {
    this.form.elements = elements;
  }

  @action
  async saveAndContinue () {
    let { success, error } = this.data.createStatus();

    let f = await this.form;
    if (!f.elements.length) {
      try {
        await f.destroyRecord();
        this.model.screening = null;
        await this.target.send('saveAndContinue');
        success(null, true);
      } catch (e) {
        error(e);
      }
      return;
    }

    f.setProperties({
      targetType: 'JobOpening',
      targetId:   this.model.id
    });

    try {
                  console.log(f)

      let form = await f.save();

      this.afterSave();

      // this.model.screening = form;
      await this.target.send('saveAndContinue');
      success(null, true);
    } catch (e) {
      console.log('ERROR', e)
      error(e);
    }
  }
}
