import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  missingRequiredFields: computed('dryRunRecord', 'availableFields', function () {
    const availableFields = this.get('availableFields'),
          dryRunRecord = this.get('dryRunRecord');

    let missingFields = availableFields.reduce((missingField, field) => {
      let [ path, nestedPath ] = field.path.split('.'),
          pathValue = dryRunRecord[path] || undefined,
          nestedPathValue = pathValue ? dryRunRecord[path][nestedPath] : undefined;

      if (field.required && (!pathValue || !nestedPathValue)) {
        missingField.push(field.path);
      }

      return missingField;
    }, []);

    return missingFields.length ? htmlSafe(`Required field${missingFields.length > 1 ? 's are' : ' is'} missing: ${missingFields.join(', ')}`) : null;
  })
});
