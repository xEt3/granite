import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

@classic
@tagName('')
export default class FormStep extends Component {
  @computed('step.link', 'basePath')
  get fullLink () {
    return this.basePath + '.' + this.get('step.link');
  }
}
