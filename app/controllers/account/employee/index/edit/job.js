import classic from 'ember-classic-decorator';
import Controller from '@ember/controller';
import { eeoJobCategories } from 'granite/config/statics';

@classic
export default class JobController extends Controller {
  eeoJobCategories = eeoJobCategories;
}
