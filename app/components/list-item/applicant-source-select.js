import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import BaseLiComponent from './base';

@classic
@classNames('applicant-source__list-item', 'item')
@classNameBindings('selected:applicant-source__list-item--selected')
export default class ApplicantSourceSelect extends BaseLiComponent {
  sendUpdate () {
    this.onUpdate(this.model);
  }

  click () {
    this.sendUpdate();
  }
}
