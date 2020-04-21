import Component from '@glimmer/component';
import moment from 'moment';
import { or, reads, equal } from '@ember/object/computed';

export default class ListItemTalentPoolApplicantComponent extends Component {
  @or('args.model.record', 'args.model') _model
  @reads('args.model.meta.meta') _meta
  @equal('_meta.timesApplied', 1) firstIsLastApp

  get activeTime () {
    return moment().diff(this._meta.firstApplication, 'days');
  }

  get scoreAbs () {
    const v = this._meta.avgScore;
    return v ? v > 100 ? 100 : v < 0 ? 0 : v : v;
  }
}
