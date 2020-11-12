import ApplicationSerializer from './application';
import serializeObject from 'granite/utils/serialize-object';
import expandObject from 'granite/utils/expand-serialized-object';

export default class BankAccountSerializer extends ApplicationSerializer {
  normalize (modelClass, hash) {
    serializeObject(hash, true, 'ach');
    return super.normalize(...arguments);
  }

  serialize (snapshot, options) {
    var json = super.serialize(snapshot, options);

    json._id = json.id;
    delete json.id;

    expandObject(json, 'ach');

    return json;
  }
}
