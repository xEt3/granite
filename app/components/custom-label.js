import classic from 'ember-classic-decorator';
import { classNames, attributeBindings, classNameBindings, tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import hexToRgb from 'granite/utils/hex-to-rgb';

@classic
@tagName('div')
@classNames('ui', 'label')
@attributeBindings('color:style')
@classNameBindings('size')
class CustomLabel extends Component {
  @computed('label.color')
  get color() {
    if (!this.get('label.color')) {
      return;
    }

    let { r, g, b } = hexToRgb(this.get('label.color')),
        textColor = (r * 299 + g * 587 + b * 114) / 1000 > 123 ? 'black' : 'white';

    return htmlSafe(`background-color: ${this.get('label.color')}; color: ${textColor}`);
  }
}

CustomLabel.reopenClass({ positionalParams: [ 'label' ] });

export default CustomLabel;

/* Usage

{{custom-label label tagName="span" size="mini"}}

*/
