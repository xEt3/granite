import DS from 'ember-data';
import ApplicationSerializer from './application';

export default class ElectionSerializer extends ApplicationSerializer.extend(DS.EmbeddedRecordsMixin) {
  attrs = { dependents: { embedded: 'always' } }
}
