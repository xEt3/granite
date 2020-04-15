import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class ErrorController extends Controller {
  @computed('fromError')
  get clientError() {
    var error = this.fromError;
    return error && error.status === 400;
  }
}
