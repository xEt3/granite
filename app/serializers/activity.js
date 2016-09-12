import DS from 'ember-data';
import ApplicationSerializer from './application';

export default ApplicationSerializer.extend(DS.EmbeddedRecordsMixin, {
  attrs: {
    comments: { embedded: 'always' },
    likes: { embedded: 'always' }
  },

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
