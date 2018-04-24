import Component from '@ember/component';

const SectionComponent = Component.extend({
});

SectionComponent.reopenClass({
  positionalParams: [ 'sectionName' ]
})

export default SectionComponent;
