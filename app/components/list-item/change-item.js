import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import BaseLiComponent from './base';

@classic
@classNames('item', 'clearfix')
export default class ChangeItem extends BaseLiComponent {
  /* stubs */
  onApprove = () => {};

  onReject = () => {};
}
