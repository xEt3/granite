import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { inject as service } from '@ember/service';
import BaseLiComponent from './base';

@classic
@classNames('item')
export default class JobOpeningItem extends BaseLiComponent {
  @service
  auth;
}
