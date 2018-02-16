import Component from '@ember/component';
import { computed } from '@ember/object';
import moment from 'moment';

export default Component.extend({
  endOptions: computed('start', function () {
    const start = this.get('start'),
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
  })
});
