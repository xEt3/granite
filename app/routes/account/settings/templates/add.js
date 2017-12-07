import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const {
  Route,
  RSVP: { hash },
  inject: { service }
} = Ember;

export default Route.extend(add, {
  ajax: service(),
  modelName: 'template',

  getModelDefaults (params) {
    return this.get('ajax').request(`/api/v1/template/${params.template_key}/default`)
    .then(({ template }) => {
      const { content } = template,
            { isRenderable } = this.get('definition');

      return {
        key: params.template_key,
        isRenderable,
        content
      };
    });
  },

  model (params) {
    return this.store.query('template-definition', { key: params.template_key })
    .then(definition => {
      this.set('definition', definition);

      return hash({
        definition,
        template: this._super(...arguments)
      });
    });
  },

  setupController (controller, model) {
    controller.setProperties({
      model: model.template,
      definition: model.definition.get('firstObject')
    });
  }
});
