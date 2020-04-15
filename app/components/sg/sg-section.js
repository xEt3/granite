import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('sg__section', 'ui stacked segment')
@classNameBindings('_hidden:hidden')
export default class SgSection extends Component {
  @computed('focus', 'name')
  get _hidden () {
    return this.focus && this.focus !== this.name;
  }
}
