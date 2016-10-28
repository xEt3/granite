import Ember from 'ember';
import moment from 'moment';
import ENV from 'granite/config/environment';

const { Service, computed, on, run } = Ember;

export default Service.extend({
  refreshResolution: 1000,
  t: computed.alias('time'),

  _tick: on('init', function () {
    const m = moment();

    this.setProperties({
      second: m.get('second'),
      minute: m.get('minute'),
      hour:   m.get('hour'),
      time:   m.toDate()
    });

    if ( ENV.environment !== 'test' ) {
      run.later(this, this._tick, this.get('refreshResolution'));
    }
  })
});

/*
  Ember.Controller.extend({
    clock: Ember.inject.service(),
    initializeClock: Ember.on('init', function () {
      this.get('clock');
    }),
    tick: Ember.observer('clock.t', function () {
      // clock update
    })
  });
*/
