import classic from 'ember-classic-decorator';
import { classNameBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('tr')
@classNameBindings('isInvalid:census__highlight-row')
export default class TableRow extends Component {
  @computed('validation.[]')
  get isInvalid() {
    let v = this.get('validation');
    return v && v.some((cell = {}) => cell.invalid);
  }
}
