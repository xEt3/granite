import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import Component from '@ember/component';

@classic
export default class IssueDocuments extends Component {
  @action
  delete() {
    this.onDelete(this.document);
  }
}
