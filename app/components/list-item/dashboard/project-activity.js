import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { computed } from '@ember/object';
import BaseLiComponent from '../base';

const ACT_COLORS = {
  dueOn:       'text-warning',
  cancelledOn: 'light text',
  completedOn: 'text-green'
};

@classic
@classNames('item')
export default class ProjectActivity extends BaseLiComponent {
  @computed('model.{dateValue,type}')
  get actionString() {
    let model = this.model,
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
  }

  @computed('model.{type}')
  get actColor() {
    return ACT_COLORS[this.get('model.type')];
  }

  @computed('model.title')
  get projectSlug() {
    let title = this.get('model.title');
    return title ? title.replace(/\s/g, '-') : title;
  }
}
