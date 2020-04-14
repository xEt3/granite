import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';

@classic
export default class PrintAllController extends Controller {
  queryParams = [ 'issue', 'slug' ];
}
