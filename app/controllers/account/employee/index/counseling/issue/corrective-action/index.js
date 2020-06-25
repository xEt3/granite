import Controller from 'granite/core/controller';
import { computed } from '@ember/object';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AccountEmployeeIssueCorrectiveActionIndexController extends Controller {
  @service data

  followUpSort = [ 'created' ]

  @computed.sort('model.followUps', 'followUpSort') sortedFollowUps

  @action
  deleteDocument (document) {
    this.model.documents.removeObject(document);
    this.data.saveRecord(this.model);
  }
}
