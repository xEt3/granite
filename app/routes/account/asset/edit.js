import Route from '@ember/routing/route';
import edit from 'granite/mixins/route-abstractions/edit';

export default Route.extend(edit, {
  titleToken:      'Edit Asset',
  modelName:       'asset',
  bypassModelHook: true,

  async model () {
    let asset = this.modelFor('account.asset');
    return {
      asset:            asset,
      initialDocuments: JSON.stringify((await asset.get('documents')).toArray()) || []
    };
  },

  setupController (controller, model) {
    controller.setProperties({
      model:            model.asset,
      initialDocuments: model.initialDocuments
    });
  }
});
