import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('ui', 'field')
class ControlComponent extends Component {
  hasNull = true;
  itemValuePath = 'id';

  didInsertElement() {
    super.didInsertElement(...arguments);

    if (this.state && !this.get('parentView.active')) {
      this.set('parentView.active', true);
    }
  }

  @computed('type', 'searchable')
  get selectionClass() {
    if (this.type !== 'select') {
      return;
    }

    let classText = 'selection';

    if (this.multi) {
      classText = `multiple ${classText}`;
    }

    if (this.searchable) {
      classText = `search ${classText}`;
    }

    return classText;
  }

  __update(val) {
    this.update(this.controlName, val);
  }
}

ControlComponent.reopenClass({ positionalParams: [ 'controlName', 'state' ] });

export default ControlComponent;
