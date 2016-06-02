import ApplicationSerializer from './application';
import serializeObject from '../utils/serialize-object';
import expandObject from '../utils/expand-serialized-object';

export default ApplicationSerializer.extend({
  normalize ( modelClass, hash ) {
    if ( modelClass.modelName === 'company' ) {
      serializeObject(hash, true, 'address');
    }

    return this._super(...arguments);
  },

  serialize ( snapshot, options ) {
    var json = this._super(snapshot, options);
    expandObject(json, 'address');
    json.contact = {};
    json.contact.name = {};
    json.contact.name.first = json.contactFirstName;
    json.contact.name.last = json.contactLastName;
    json.contact.name.middle = json.contactMiddleName;
    json.contact.phone = json.contactPhone;
    json.contact.ext = json.contactExtension;
    return json;
  }
});
