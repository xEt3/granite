import Controller from 'granite/core/controller';
import { eeoJobCategories } from 'granite/config/statics';
import { inject as service } from '@ember/service';

export default class AccountEmployeeOnboardJobInformationController extends Controller {
  @service data
  eeoJobCategories = eeoJobCategories;
}
