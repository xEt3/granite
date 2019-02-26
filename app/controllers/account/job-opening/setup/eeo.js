import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { eeoJobCategories } from 'granite/config/statics';

export default Controller.extend({
  eeoJobCategories,
  collectEEO: computed.reads('auth.user.company.collectEEO'),

  eeoSettingsForm: computed(() => [{
    label:        'EEO Job Category',
    helpText:     'This category is used in data for the EEO-1 report. You can also override this in the employee record once hired.',
    indirectHelp: true,
    inputClass:   'search',
    type:         'select',
    path:         'eeoCategory',
    contentPath:  'controller.eeoJobCategories'
  }])
});
