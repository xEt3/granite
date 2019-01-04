import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  test: computed('dryRunRecord', 'availableFields', function () {
    let availableFields = this.get('availableFields'),
        dryRunRecord = this.get('dryRunRecord');

    availableFields.forEach(field => {
      console.log('on field:', field.path);

      //ACOUNT FOR OBJECTS HERE TOO - IE NAME IS AN OBJECT SO THE PATH DOESN'T CALCULATE CORRECTLY IN THE BELOW BRACKET NOTATION

      if (field.required && !dryRunRecord[field.path]) {
        // console.log('dryRunRecord', dryRunRecord);
        // console.log('field:', field);
        console.log('field is required and the record is missing field path');
      }
    });
  })
});

//dryRunRecord
//index
//availableFields
