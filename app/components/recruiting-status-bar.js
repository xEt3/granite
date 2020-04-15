import Component from '@ember/component';
import { computed } from '@ember/object';
import { className, classNames, tagName } from '@ember-decorators/component';

@tagName('div')
@classNames('ui', 'top', 'attached', 'label')
class RecruitingStatusBar extends Component {
  @className
  @computed('campaign.{hiring,startOn}')
  get campaignStatus () {
    let { hiring, startOn } = this.campaign,
        now = moment();

    return hiring ? 'green' : now.isBefore(startOn) ? null : 'red';
  }
}

export default RecruitingStatusBar;
