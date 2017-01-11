import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  sourcesList: computed('model.applicantSources.@each.name', function () {
    return this.get('model.applicantSources').map(source =>
      source.get('name')
    ).join('<br>');
  })
});
