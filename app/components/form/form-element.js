import Ember from 'ember';
import SortableItem from 'ember-sortable/components/sortable-item';
import { formTypes } from 'granite/config/statics';

const { computed } = Ember;

const FormElementComponent = SortableItem.extend({
  formTypes,

  positionInForm: computed('index', function () {
    return this.get('index') + 1;
  })
});

FormElementComponent.reopenClass({
  positionalParams: [ 'model', 'group' ]
});

export default FormElementComponent;
