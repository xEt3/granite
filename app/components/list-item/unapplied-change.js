import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ListItemUnappliedChange extends Component {
  @service data

  @action
  async modifyEffectiveDate () {
    this.args.history.effectiveOn = new Date();
    await this.data.saveRecord(this.args.history, 'working', { notify: false });
    this.args.onApplyNow();
  }
}
