import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

const dictMap = [ 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten' ];

@classic
@classNames('ui', 'steps')
@classNameBindings('dictStep')
export default class FormSteps extends Component {
  didReceiveAttrs () {
    this.set('_step', this.step);
  }

  @computed('steps')
  get dictStep () {
    return dictMap[this.get('steps.length') - 1];
  }
}
