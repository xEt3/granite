import BaseLiComponent from './base';
import { computed } from '@ember/object';
import moment from 'moment';

export default BaseLiComponent.extend({
  classNames:     [ 'item' ],
  _model:         computed.or('model.record', 'model'),
  _meta:          computed.reads('model.meta.meta'),
  firstIsLastApp: computed.equal('_meta.timesApplied', 1),

  activeTime: computed('_meta.firstApplication', function () {
    return moment().diff(this.get('_meta.firstApplication'), 'days');
  }),

  scoreAbs: computed('_meta.avgScore', function () {
    const v = this.get('_meta.avgScore');
    return v ? v > 100 ? 100 : v < 0 ? 0 : v : v;
  })
});
