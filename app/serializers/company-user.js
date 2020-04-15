import classic from 'ember-classic-decorator';
import ApplicationSerializer from './application';

@classic
export default class CompanyUser extends ApplicationSerializer {
  normalize (modelClass, hash) {
    if (modelClass.modelName !== 'company-user') {
      return super.normalize(...arguments);
    }

    if (hash.name) {
      hash.firstName = hash.name.first;
      hash.middleName = hash.name.middle;
      hash.lastName = hash.name.last;

      delete hash.name;
    }

    return super.normalize(...arguments);
  }

  serialize (snapshot, options) {
    var json = super.serialize(snapshot, options);

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
}
