import { GraniteResourceController } from 'granite/core/controller';
import { inject as service } from '@ember/service';

export default class AccountRecruitingJobDescriptionController extends GraniteResourceController {
  @service auth;

  get intros () {
    return [{
      element:  '.ui.segment.container',
      intro:    'The job description page shows you all of your job descriptions. Job descriptions can be assigned to employees and are used to start recruiting campaigns.',
      position: 'top'
    }, {
      element:  '#add-job-description',
      intro:    'You can use the add button to add job descriptions.',
      position: 'top'
    }];
  }
}
