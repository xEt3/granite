import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';

export default ApplicationSerializer.extend({
  normalize ( modelClass, hash ) {
    normalizeKeys(hash, 'suffix', 'name');
    return this._super(...arguments);
  },

  serialize () {
    let json = this._super(...arguments);

    json.name = {
      first:  json.firstName,
      middle: json.middleName,
      last:   json.lastName,
      suffix: json.suffixName
    };

    delete json.firstName;
    delete json.middleName;
    delete json.lastName;
    delete json.suffixName;

    return json;
  }
});
