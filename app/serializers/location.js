import classic from 'ember-classic-decorator';
import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';
import serializeKeys from '../utils/expand-serialized-object';


@classic
export default class Location extends ApplicationSerializer {
  normalize(modelClass, hash) {
    normalizeKeys(hash, true, 'address');
    return super.normalize(...arguments);
  }

  serialize() {
    let json = super.serialize(...arguments);
    serializeKeys(json, 'address');

    return json;
  }
}
