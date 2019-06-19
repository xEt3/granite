import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize () {
    let json = this._super(...arguments);
    json._id = json.id;
    return json;
  }
});
