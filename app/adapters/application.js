import DS from 'ember-data';
import { pluralize } from 'ember-inflector';
import AjaxServiceSupport from 'ember-ajax/mixins/ajax-support';

export default DS.RESTAdapter.extend(AjaxServiceSupport, {
  namespace: '/api/v1',

  pathForType (type) {
    return pluralize(type);
  }
});
