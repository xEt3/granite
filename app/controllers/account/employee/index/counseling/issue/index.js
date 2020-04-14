import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import resource from 'granite/mixins/controller-abstractions/resource';

@classic
export default class IndexController extends Controller.extend(resource) {
  @service
  auth;
}
