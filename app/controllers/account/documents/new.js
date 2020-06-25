import Controller from 'granite/core/controller';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { fileHandling, elementId } from 'granite/core';

@fileHandling
@elementId
export default class AccountDocumentsNewController extends Controller {
  @service data
  @service store

  @tracked fileData = {}

  saveOptions = {
    transitionAfterSave: 'account.documents.index',
    transitionWithModel: false
  }

  dropzoneId = 'input__dropzone--document'
  tagSuggestions = [ 'Reference', 'Employee Specific', 'Company Wide', 'Onboarding', 'Offboarding' ]

  @action
  uploadComplete () {
    this.transitionToRoute('account.documents.index');
  }
}
