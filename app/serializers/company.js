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
    return json;
  }
});
