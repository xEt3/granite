import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('history__timeline-item')
export default class HistoryItem extends Component {}
