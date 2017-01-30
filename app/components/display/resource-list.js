import Ember from 'ember';

const { Component, computed, Inflector } = Ember,
      inflect = new Inflector(Inflector.defaultRules);

let ResourceListComponent = Component.extend({
  modelIdentifier: 'id',
  // resourceName works off of an AdapterPopulatedRecordArray
  // and the type property that returns the query's model
  resourceName: computed('model.type', function () {
    let type = this.get('model.type.modelName');
    return type ? inflect.pluralize(type) : 'items';
  })
});

ResourceListComponent.reopenClass({
  positionalParams: [ 'model', 'itemComponent' ]
});

export default ResourceListComponent;
