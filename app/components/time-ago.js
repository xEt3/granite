import Ember from 'ember';
import moment from 'moment';

const { Component, on, run } = Ember;

function fromNowWithSeconds ( momentObject, m ) {
  const secDiff = Math.round(Math.abs(moment().diff(momentObject)) / 1000);

  if ( secDiff < 10 ) { // 10 sec
    return 'just now';
  } else if ( secDiff < 60 ) {
    return secDiff + ' seconds ago';
  }

  return momentObject.fromNow(m);
}

const TimeAgo = Component.extend({
  tagName: 'span',
  positionalParams: [ 'time' ],

  _tick: on('didInsertElement', function () {
    if ( this.get('isDestroying') || this.get('isDestroyed') ) {
      return;
    }

    this.set('computedTimeAgo', this.get('time') ? fromNowWithSeconds(moment(this.get('time'))) : 'N/A');

    run.later(this, this._tick, 1000);
  })
});

TimeAgo.reopenClass({
  positionalParams: [ 'time' ]
});

export default TimeAgo;
