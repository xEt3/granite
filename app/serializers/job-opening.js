import ApplicationSerializer from './application';

export default class JobOpening extends ApplicationSerializer {
  serialize (snapshot, options) {
    var json = super.serialize(snapshot, options);
    json.name = json.name || json.defaultName;
    return json;
  }
}
