import Ember from 'ember';
import add from 'granite/mixins/route-abstractions/add';

const { Route } = Ember;

export default Route.extend(add, {
  modelName: 'template',

  getModelDefaults (params) {
    return {
      key: params.template_key
    };
  }
});
