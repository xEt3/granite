import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';

export default class DependentSerializer extends ApplicationSerializer {
  normalize (modelClass, hash) {
    normalizeKeys(hash, 'suffix', 'name');
    normalizeKeys(hash, true, 'address', 'emergencyContact', 'finalAddress');
    return super.normalize(...arguments);
  }

  serialize () {
    let json = super.serialize(...arguments),
        deleteKeys = [ 'firstName', 'middleName', 'lastName', 'suffixName', 'id' ];

    json.name = {
      first:         json.firstName,
      middleInitial: json.middleName,
      last:          json.lastName,
      suffix:        json.suffixName
    };

    if (!json._id && json.id) {
      json._id = json.id;
    }

    deleteKeys.map(k => delete json[k]);

    return json;
  }
}
