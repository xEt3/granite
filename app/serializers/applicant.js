import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';

export default ApplicationSerializer.extend({
  normalize (modelClass, hash) {
    normalizeKeys(hash, 'suffix', 'name');
    return this._super(...arguments);
  },

  serialize () {
    let json = this._super(...arguments),
        deleteKeys = [ 'firstName', 'middleName', 'lastName', 'suffixName' ];

    json.name = {
      first:  json.firstName,
      middle: json.middleName,
      last:   json.lastName,
      suffix: json.suffixName
    };

    deleteKeys.map(k => delete json[k]);

    return json;
  }
});
