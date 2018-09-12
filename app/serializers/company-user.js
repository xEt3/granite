import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  normalize (modelClass, hash) {
    if (modelClass.modelName !== 'company-user') {
      return this._super(...arguments);
    }

    if (hash.name) {
      hash.firstName = hash.name.first;
      hash.middleName = hash.name.middle;
      hash.lastName = hash.name.last;

      delete hash.name;
    }

    return this._super(...arguments);
  },

  serialize (snapshot, options) {
    var json = this._super(snapshot, options);

    json.name = {
      first:  json.firstName,
      middle: json.middleName,
      last:   json.lastName
    };

    delete json.firstName;
    delete json.middleName;
    delete json.lastName;

    return json;
  }
});
