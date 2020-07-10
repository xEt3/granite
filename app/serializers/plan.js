import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';
import serializeKeys from '../utils/expand-serialized-object';

export default class Employee extends ApplicationSerializer {
  normalize (modelClass, hash) {
    normalizeKeys(hash, true, 'contact', 'network', 'rates');
    return super.normalize(...arguments);
  }

  serialize () {
    let json = super.serialize(...arguments),
        deleteKeys = [
          'contactName',
          'contactPhone',
          'contactFax',
          'contactAddressLine1',
          'contactAddressCity',
          'contactAddressState',
          'contactAddressZip'
        ];

    json.contact = {
      name:    json.contactName,
      phone:   json.contactPhone,
      fax:     json.contactFax,
      address: {
        line1: json.contactAddressLine1,
        city:  json.contactAddressCity,
        state: json.contactAddressState,
        zip:   json.contactAddressZip
      }
    };

    deleteKeys.map(k => delete json[k]);
    serializeKeys(json, 'network', 'rates');

    return json;
  }
}
