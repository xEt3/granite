import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('column')
class FirstStepsComponent extends Component {
  @computed('completed')
  get linkClass() {
    return `first-steps__card ${this.get('completed') ? 'first-steps__card--completed' : ''}`;
  }
}

FirstStepsComponent.reopenClass({ positionalParams: [ 'step' ] });

export default FirstStepsComponent;
