import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';

@classic
export default class DryRunEmployee extends Component {
  @computed('dryRunRecord', 'availableFields')
  get missingRequiredFields () {
    const availableFields = this.availableFields,
          dryRunRecord = this.dryRunRecord;

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
  }
}
