import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';
import moment from 'moment';

@classic
export default class DateRange extends Component {
  @computed('start')
  get endOptions () {
    const start = this.start,
          loopDate = moment(start),
          opts = [];

    for (let i = 0; i < 12; i++) {
      loopDate.add(15, 'minutes');

      let diffHours = loopDate.diff(start, 'hours', true),
          diffMins = diffHours % 1 * 60,
          diffs = [];

      diffHours = Math.floor(diffHours);

      if (diffHours) {
        diffs.push(`${diffHours} ${diffHours > 1 ? 'hours' : 'hour'}`);
      }

      if (diffMins) {
        diffs.push(`${diffMins} minutes`);
      }

      opts.push({
        value: loopDate.toDate(),
        label: `${moment(loopDate).format('h:mma')} (${diffs.join(' ')})`
      });
    }

    return opts;
  }
}
