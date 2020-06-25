import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';

@classic
export default class SearchController extends Controller {
  queryParams = [ 'q' ];
}
