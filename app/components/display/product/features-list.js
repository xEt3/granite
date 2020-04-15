import { tracked } from '@glimmer/tracking';
import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('section-content__features')
class FeaturesListComponent extends Component {
  @tracked autoCycle = 0;
  autoCycleMs = 5000;

  didInsertElement() {
    this.scheduleAutoCycle();
  }

  willDestroyElement() {
    this.cancelAutoCycle();
  }

  scheduleAutoCycle() {
    if (!this.isDestroyed) {
      this.set('_autoCycleTimer', setTimeout(this.incrementAutoCycle.bind(this), this.autoCycleMs));
    }
  }

  cancelAutoCycle() {
    let timerId = this._autoCycleTimer;

    if (timerId) {
      clearTimeout(timerId);
    }
  }

  incrementAutoCycle() {
    if (this.get('features.length') - 1 === this.autoCycle) {
      this.set('autoCycle', 0);
    } else {
      this.incrementProperty('autoCycle');
    }

    this.scheduleAutoCycle();
  }

  @computed('selectedFeature', 'features.[]', 'autoCycle')
  get feature() {
    return this.selectedFeature || this.features[this.autoCycle];
  }

  @action
  selectFeature(feature) {
    this.set('selectedFeature', feature);
  }
}

FeaturesListComponent.reopenClass({ positionalParams: [ 'features' ] });

export default FeaturesListComponent;
