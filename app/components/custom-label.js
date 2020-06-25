import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';
import hexToRgb from 'granite/utils/hex-to-rgb';

export default class CustomLabelComponent extends Component {
  get color () {
    if (!this.args.label.color) {
      return null;
    }

    let { r, g, b } = hexToRgb(this.args.label.color),
        textColor = (r * 299 + g * 587 + b * 114) / 1000 > 123 ? 'black' : 'white';

    return htmlSafe(`background-color: ${this.args.label.color}; color: ${textColor}`);
  }
}

/* Usage

<CustomLabel @label={{label}} @tagName="span" @size="mini" />

*/
