import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FeaturesListComponent extends Component {
  @tracked autoCycle = 0;
  @tracked selectedFeature;
  autoCycleMs = 5000;

  get feature () {
    return this.selectedFeature || this.args.features[this.autoCycle];
  }

  @action
  scheduleAutoCycle () {
    if (!this.isDestroyed) {
      this._autoCycleTimer = setTimeout(this.incrementAutoCycle.bind(this), this.autoCycleMs);
    }
  }

  @action
  cancelAutoCycle () {
    let timerId = this._autoCycleTimer;

    if (timerId) {
      clearTimeout(timerId);
    }
  }

  @action
  incrementAutoCycle () {
    if (this.args.features.length - 1 === this.autoCycle) {
      this.autoCycle = 0;
    } else {
      this.autoCycle++;
    }

    this.scheduleAutoCycle();
  }

  @action
  selectFeature (feature) {
    this.selectedFeature = feature;
  }
}
