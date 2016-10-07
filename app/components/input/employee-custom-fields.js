import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'field' ],

  actions: {
    removeEmployeeCustomFieldName ( attr ) {
      let model = this.get('model'),
          employeeCustomField = model.get('customFields');

      if ( employeeCustomField ) {
        delete employeeCustomField[attr];
        model.set('customFields', employeeCustomField);
        this.rerender();
      }
    }
  }
});
