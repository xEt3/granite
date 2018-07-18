import Component from '@ember/component';
import { computed } from '@ember/object';

const FeaturesListComponent = Component.extend({
  classNames: [ 'section-content__features' ],


  feature: computed('selectedFeature', 'features.[]', function () {
    return this.get('selectedFeature') || this.get('features')[0];
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
