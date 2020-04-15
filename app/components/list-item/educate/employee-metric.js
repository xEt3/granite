import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import BaseLiComponent from '../base';

@classic
@classNames('ui', 'card', 'educate__employee-metric')
export default class EmployeeMetric extends BaseLiComponent {
  @computed('model.{completed,assigned}')
  get percentCompleted () {
    const completed = this.get('model.completed') || 0,
          assigned = this.get('model.total') || 0;

    return Math.round(completed / assigned * 100);
  }
}
