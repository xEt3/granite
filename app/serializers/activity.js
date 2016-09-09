import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  serialize () {
    let json = this._super(...arguments);

    let isNull = val => !val || val === '';


    if ( isNull(json.targetId) ) {
      delete json.targetId;
    }

    if ( isNull(json.actorId) ) {
      delete json.actorId;
    }

    return json;
  }
});
