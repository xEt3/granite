import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import BaseLiComponent from './base';

@classic
@classNames('content')
export default class EmployeeIssueItem extends BaseLiComponent {}
