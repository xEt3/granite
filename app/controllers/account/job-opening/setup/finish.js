import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  sourcesList: computed('model.applicantSources.@each.name', function () {
    return this.get('model.applicantSources').mapBy('name').join('<br>');
  })
});
