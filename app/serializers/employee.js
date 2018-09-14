import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';
import serializeKeys from '../utils/expand-serialized-object';

export default ApplicationSerializer.extend({
  normalize (modelClass, hash) {
    normalizeKeys(hash, 'suffix', 'name');
    normalizeKeys(hash, true, 'address', 'emergencyContact', 'finalAddress', 'externalLink');
    return this._super(...arguments);
  },

  serialize () {
    let json = this._super(...arguments),
        keys = [ 'department', 'location', 'supervisor', 'companyUser', 'creator' ],
        deleteKeys = [ 'firstName', 'middleName', 'lastName', 'suffixName', 'emergencyContactPhone', 'emergencyContactNameLast', 'emergencyContactNameFirst' ],
        isNull = val => !val || val === '';

    keys.forEach(key => {
      if (isNull(json[key])) {
        delete json[key];
      }
    });

    json.name = {
      first:  json.firstName,
      middle: json.middleName,
      last:   json.lastName,
      suffix: json.suffixName
    };

    json.emergencyContact = {
      name: {
        first: json.emergencyContactNameFirst,
        last:  json.emergencyContactNameLast
      },
      phone: json.emergencyContactPhone
    };

    deleteKeys.map(k => delete json[k]);

    serializeKeys(json, 'address', 'finalAddress', 'externalLink');

    return json;
  }
});
