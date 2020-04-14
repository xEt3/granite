import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import Component from '@ember/component';

@classic
@classNames('section-content__features')
class FeaturesListComponent extends Component {
  autoCycle = 0;
  autoCycleMs = 5000;

  didInsertElement() {
    this.scheduleAutoCycle();
  }

  willDestroyElement() {
    this.cancelAutoCycle();
  }

  scheduleAutoCycle() {
    if (!this.isDestroyed) {
      this.set('_autoCycleTimer', setTimeout(this.incrementAutoCycle.bind(this), this.get('autoCycleMs')));
    }
  }

  cancelAutoCycle() {
    let timerId = this.get('_autoCycleTimer');

    if (timerId) {
      clearTimeout(timerId);
    }
  }

  incrementAutoCycle() {
    if (this.get('features.length') - 1 === this.get('autoCycle')) {
      this.set('autoCycle', 0);
    } else {
      this.incrementProperty('autoCycle');
    }

    this.scheduleAutoCycle();
  }

  @computed('selectedFeature', 'features.[]', 'autoCycle')
  get feature() {
    return this.get('selectedFeature') || this.get('features')[this.get('autoCycle')];
  }

  @action
  selectFeature(feature) {
    this.set('selectedFeature', feature);
  }
}

FeaturesListComponent.reopenClass({ positionalParams: [ 'features' ] });

export default FeaturesListComponent;
