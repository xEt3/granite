import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { on } from '@ember-decorators/object';
/* eslint-disable ember/no-on-calls-in-components*/
import Component from '@ember/component';
import { run } from '@ember/runloop';
import moment from 'moment';
import ENV from 'granite/config/environment';

function fromNowWithSeconds (momentObject, m) {
  const secDiff = Math.round(Math.abs(moment().diff(momentObject)) / 1000);

  if (secDiff < 10) { // 10 sec
    return 'just now';
  } else if (secDiff < 60) {
    return secDiff + ' seconds ago';
  }

  return momentObject.fromNow(m);
}

@classic
@tagName('span')
class TimeAgo extends Component {
  positionalParams = [ 'time' ];

  @on('didInsertElement')
  _tick () {
    if (this.isDestroying || this.isDestroyed) {
      return;
    }

    this.set('computedTimeAgo', this.time ? fromNowWithSeconds(moment(this.time)) : 'N/A');

    if (ENV.environment !== 'test') {
      run.later(this, this._tick, 1000);
    }
  }
}

TimeAgo.reopenClass({ positionalParams: [ 'time' ] });

export default TimeAgo;
