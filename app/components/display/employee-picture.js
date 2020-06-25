import Component from '@glimmer/component';
import { or } from '@ember/object/computed';

export default class DisplayEmployeePictureComponent extends Component {
  get defaultUrl () {
    return this.args.employeeId ? `/api/v1/employee/${this.args.employeeId}/avatar` : 'https://www.gravatar.com/avatar/?f=y&d=mp';
  }

  @or('args.url', 'defaultUrl') src
}
