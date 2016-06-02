import DS from 'ember-data';
import Ember from 'ember';

export default DS.RESTAdapter.extend({
  namespace: 'api/v1',
  pathForType ( type ) {
    return Ember.String.pluralize(type);
  }
});
