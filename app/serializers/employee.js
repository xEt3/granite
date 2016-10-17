import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';
import serializeKeys from '../utils/expand-serialized-object';

export default ApplicationSerializer.extend({
  normalize ( modelClass, hash ) {
    normalizeKeys(hash, 'suffix', 'name');
    normalizeKeys(hash, true, 'address', 'emergencyContact');
    return this._super(...arguments);
  },

  serialize () {
    let json = this._super(...arguments),
        keys = [ 'department', 'location', 'supervisor', 'companyUser', 'creator' ],
        isNull = val => !val || val === '';

    keys.forEach( key => {
      if ( isNull(json[key])){
        delete json[key];
      }
    });

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

    serializeKeys(json, 'address', 'emergencyContact');

    return json;
  }
});
