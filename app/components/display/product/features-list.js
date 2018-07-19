import Component from '@ember/component';
import { computed } from '@ember/object';
import { later, cancel } from '@ember/runloop';

const FeaturesListComponent = Component.extend({
  classNames: [ 'section-content__features' ],
  autoCycle: 0,
  autoCycleMs: 5000,

  didInsertElement () {
    this.scheduleAutoCycle();
  },

  willDestroyElement () {
    this.cancelAutoCycle();
  },

  scheduleAutoCycle () {
    this.set('_autoCycleTimer', later(this, this.incrementAutoCycle, this.get('autoCycleMs')));
  },

  cancelAutoCycle () {
    let timerId = this.get('_autoCycleTimer');

    if (timerId) {
      cancel(timerId);
    }
  },

  incrementAutoCycle () {
    if (this.get('features.length') - 1 === this.get('autoCycle')) {
      this.set('autoCycle', 0);
    } else {
      this.incrementProperty('autoCycle');
    }

    this.scheduleAutoCycle();
  },

  feature: computed('selectedFeature', 'features.[]', 'autoCycle', function () {
    return this.get('selectedFeature') || this.get('features')[this.get('autoCycle')];
  }),

  actions: {
    selectFeature (feature) {
      this.set('selectedFeature', feature);
    }
  }
});

FeaturesListComponent.reopenClass({
  positionalParams: [ 'features' ]
});

export default FeaturesListComponent;
