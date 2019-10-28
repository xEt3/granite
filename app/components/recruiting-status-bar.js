import Component from '@ember/component';
import { computed } from '@ember/object';

class RecruitingStatusBar extends Component {
  classNames = [ 'ui', 'top', 'attached', 'label' ]
  classNameBindings = [ 'isOpen:green' ]
  tagName = 'div'

  @computed('campaign.{startOn,endOn,completedOn,dueOn}')
  get isOpen () {
    console.log('in getter');
    return true;
  }
}

// export default Component.extend({
// });
export default RecruitingStatusBar;
