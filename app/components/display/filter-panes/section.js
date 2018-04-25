import Component from '@ember/component';

const SectionComponent = Component.extend({
  classNames: [ 'ui', 'vertical', 'segment' ],
  classNameBindings: [ 'active::fade-unless-hovered' ],

  toggleActive () {
    this.toggleProperty('active');

    if (!this.get('active')) {
      let resets = this.get('resets');

      if (resets && resets.length > 0) {
        resets.map(reset => this.resetFilter(reset));
      }

      this.resetFilter(resets || this.get('childViews.0.controlName') || (this.get('sectionName') || '').toLowerCase());
    }
  }
});

SectionComponent.reopenClass({
  positionalParams: [ 'sectionName' ]
})

export default SectionComponent;
