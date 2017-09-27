import Ember from 'ember';

const { Route, A } = Ember;

export default Route.extend({
  model () {
    const parentModel = this._super(...arguments),
          def = (parentModel.definitions || A()).toArray(),
          templates = parentModel.templates || A();

    return Object.assign({}, parentModel, {
      definitionsGrouped: def.reduce((groups, definition) => {
        groups.pushObject({
          definition,
          category: definition.get('category'),
          template: templates.filter(t => t.get('key') === definition.get('key'))[0]
        });

        return groups;
      }, A())
    });
  }
});
