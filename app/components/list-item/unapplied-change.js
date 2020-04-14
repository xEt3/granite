import classic from 'ember-classic-decorator';
import { action } from '@ember/object';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';
import del from 'granite/mixins/controller-abstractions/delete';

@classic
@classNames('history__timeline-item', 'card')
export default class UnappliedChange extends Component.extend(del, addEdit) {
  enableNotify = false;

  @action
  modifyEffectiveDate() {
    let history = this.get('history');
    this.set('history.effectiveOn', new Date());
    this.saveModel(history).then((x) => {
      this.get('onApplyNow')(x);
    });
  }
}
