import classic from 'ember-classic-decorator';
import { classNameBindings } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import BaseLiComponent from './base';
import { A } from '@ember/array';

@classic
@classNameBindings('isSelected:is-selected')
export default class PendingApplicant extends BaseLiComponent {
  @computed('selected.[]', 'model')
  get isSelected() {
    return (this.get('selected') || A()).includes(this.get('model'));
  }

  click(e) {
    if (e.target.className.indexOf('content__link') < 0) {
      e.preventDefault();
      this.send('select');
    }
  }

  @action
  select() {
    this.get('onSelectChange')(this.get('model'), this.get('isSelected'));
  }
}
