import Component from '@ember/component';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Component.extend({
  missingRequiredFields: computed('dryRunRecord', 'availableFields', function () {
    let availableFields = this.get('availableFields'),
        dryRunRecord = this.get('dryRunRecord'),
        missingField = null;

    availableFields.forEach(field => {
      let [ path, nestedPath ] = field.path.split('.'),
          pathValue = dryRunRecord[path] || undefined,
          nestedPathValue = pathValue ? dryRunRecord[path][nestedPath] : undefined;

      if (field.required && (!pathValue || !nestedPathValue)) {
        missingField = field.path;
      }
    });
    return missingField ? htmlSafe(`Required field ${missingField} is missing.`) : null;
  })
});
