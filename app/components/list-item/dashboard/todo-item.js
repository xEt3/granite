import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import BaseLiComponent from '../base';

@classic
@classNames('item', 'action-item__checklist--item')
export default class TodoItem extends BaseLiComponent {
  @computed('model.title')
  get slug () {
    let title = this.get('model.title');
    return title ? title.replace(/\s/g, '-') : title;
  }
}
