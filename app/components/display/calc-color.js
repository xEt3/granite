import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

const fromPercent = (n, max) => Math.round(n / 100 * max);

export default class CalcColorComponent extends Component {
  @tracked scale = 255;

  get scaleValue () {
    return this.args.scale || this.scale;
  }

  get mixes () {
    const scale = this.scaleValue,
          val = this.args.value;

    return {
      low:  fromPercent(100 - val, scale),
      high: fromPercent(val, scale)
    };
  }
}
