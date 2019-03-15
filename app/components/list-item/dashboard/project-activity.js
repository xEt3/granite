import BaseLiComponent from '../base';
import { computed } from '@ember/object';

const ACT_COLORS = {
  dueOn:       'text-warning',
  cancelledOn: 'light text',
  completedOn: 'text-green'
};

export default BaseLiComponent.extend({
  classNames: [ 'item' ],

  actionString: computed('model.{dateValue,type}', function () {
    let model = this.get('model'),
        mVal = moment(model.dateValue),
        ret;

    switch (model.type) {
    case 'dueOn':
      ret = `${mVal.isBefore(moment()) ? 'was' : 'is'} due ${mVal.fromNow()}`;
      break;
    case 'cancelledOn':
      ret = `was cancelled ${mVal.fromNow()}`;
      break;
    case 'delayedUntil':
      ret = `was delayed until ${mVal.format('M/D/YY')}`;
      break;
    case 'completedOn':
      ret = `was completed ${mVal.fromNow()} on ${mVal.format('M/D/YY [at] h:mma')}`;
      break;
    default:
      break;
    }

    return ret;
  }),

  actColor: computed('model.{type}', function () {
    return ACT_COLORS[this.get('model.type')];
  }),

  projectSlug: computed('model.title', function () {
    let title = this.get('model.title');
    return title ? title.replace(/\s/g, '-') : title;
  })
});
