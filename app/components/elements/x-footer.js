import classic from 'ember-classic-decorator';
import { classNames, tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('footer')
@classNames('elements__footer')
export default class XFooter extends Component {
  now = new Date();
}
