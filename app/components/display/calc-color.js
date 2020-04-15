import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import { computed } from '@ember/object';
import Component from '@ember/component';

const fromPercent = (n, max) => Math.round(n / 100 * max);

@classic
@tagName('')
class calcColorComponent extends Component {
  @tracked scale = 255;

  @computed('value', 'scale')
  get mixes() {
    const scale = this.scale,
          val = this.value;

    return {
      low:  fromPercent(100 - val, scale),
      high: fromPercent(val, scale)
    };
  }
}

calcColorComponent.reopenClass({ positionalParams: [ 'value' ] });

export default calcColorComponent;
