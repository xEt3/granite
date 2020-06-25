import Controller from 'granite/core/controller';
import { reads } from '@ember/object/computed';
import { eeoJobCategories } from 'granite/config/statics';
import { inject as service } from '@ember/service';

export default class AccountJobOpeningSetupEeoController extends Controller {
  @service data

  eeoJobCategories = eeoJobCategories

  @reads('auth.user.company.collectEEO') collectEEO

  eeoSettingsForm = [{
    label:        'EEO Job Category',
    helpText:     'This category is used in data for the EEO-1 report. You can also override this in the employee record once hired.',
    indirectHelp: true,
    inputClass:   'search',
    type:         'select',
    path:         'eeoCategory',
    contentPath:  'controller.eeoJobCategories'
  }]
}
