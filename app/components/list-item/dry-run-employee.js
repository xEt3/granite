import Component from '@glimmer/component';
import { htmlSafe } from '@ember/string';

export default class LIstItemDryRunEmployee extends Component {
  get missingRequiredFields () {
    const availableFields = this.args.availableFields,
          dryRunRecord = this.args.dryRunRecord;

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
