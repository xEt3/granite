import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';
import serializeKeys from '../utils/expand-serialized-object';


export default ApplicationSerializer.extend({
  normalize (modelClass, hash) {
    normalizeKeys(hash, true, 'address');
    return this._super(...arguments);
  },

  serialize () {
    let json = this._super(...arguments);
    serializeKeys(json, 'address');

    return json;
  }
});
