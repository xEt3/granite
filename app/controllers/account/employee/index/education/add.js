import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { forms } from 'granite/config/forms/educate-add';
import addEdit from 'granite/mixins/controller-abstractions/add-edit';

export default Controller.extend(addEdit, {
  queryParams: [ 'type' ],

  currentForm: computed('type', function () {
    return forms[this.get('type')];
  })

  // actions: {
  // }
});
