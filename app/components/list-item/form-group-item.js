import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import BaseLiComponent from './base';

@classic
@classNames('item')
export default class FormGroupItem extends BaseLiComponent {}
