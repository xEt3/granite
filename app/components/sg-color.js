import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('sg__color', 'col-md-2')
@classNameBindings('computedClassName')
export default class SgColor extends Component {
  @computed('color')
  get computedClassName () {
    return 'sg__color-' + this.color;
  }
}
