import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import BaseLiComponent from './base';

@classic
@classNames('item')
export default class CorrectiveActionFollowup extends BaseLiComponent {}
