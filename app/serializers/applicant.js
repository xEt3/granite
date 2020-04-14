import classic from 'ember-classic-decorator';
import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';

@classic
export default class Applicant extends ApplicationSerializer {
  normalize(modelClass, hash) {
    normalizeKeys(hash, 'suffix', 'name');
    return super.normalize(...arguments);
  }

  serialize() {
    let json = super.serialize(...arguments),
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
}
