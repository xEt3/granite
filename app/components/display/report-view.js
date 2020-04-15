import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('table')
@classNames('ui celled table')
class reportView extends Component {
  @computed('data')
  get headers() {
    return this.data[0];
  }

  @computed('data')
  get bodyData() {
    return this.data.slice(1);
  }
}

reportView.reopenClass({ positionalParams: [ 'data' ] });

export default reportView;
