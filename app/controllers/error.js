import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  clientError: computed('fromError', function () {
    var error = this.get('fromError');
    return error && error.status === 400;
  })
});
