import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import Controller from '@ember/controller';
import resource from 'granite/mixins/controller-abstractions/resource';

@classic
export default class IndexController extends Controller.extend(resource) {
  @service
  auth;

  @computed
  get intros() {
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
