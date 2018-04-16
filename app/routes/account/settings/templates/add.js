import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { inject as service } from '@ember/service';
import add from 'granite/mixins/route-abstractions/add';

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
    const mixin = this._super.bind(this);

    return this.store.query('template-definition', { key: params.template_key })
    .then(definition => {
      this.set('definition', definition);
      return hash({
        definition,
        template: mixin(params)
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
