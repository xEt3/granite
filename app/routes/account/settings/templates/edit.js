import Ember from 'ember';
import edit from 'granite/mixins/route-abstractions/edit';

const { Route } = Ember;

export default Route.extend(edit, {
  modelName: 'template',
  segmentKey: 'template_id',

  model () {
    return this._super(...arguments)
    .then(template => {
      return this.store.query('template-definition', { key: template.get('key') })
      .then(definition => ({
        template,
        definition: definition.get('firstObject')
      }));
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.template,
      definition: model.definition
    });
  }
});