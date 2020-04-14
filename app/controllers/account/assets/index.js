import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import pagination from 'granite/mixins/controller-abstractions/pagination';

@classic
export default class IndexController extends Controller.extend(pagination) {
  queryParams = [ 'page' ];
  limit = 20;
}
