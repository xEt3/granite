import Route from 'granite/core/route';

export default class AccountAssetEditRoute extends Route {
  titleToken =      'Edit Asset'
  modelName =     'asset'
  bypassModelHook = true
  routeType = 'edit'

  async model () {
    let asset = this.modelFor('account.asset');
    return {
      asset:            asset,
      initialDocuments: JSON.stringify((await asset.get('documents')).toArray()) || []
    };
  }

  setupController (controller, model) {
    controller.setProperties({
      model:            model.asset,
      initialDocuments: model.initialDocuments
    });
  }
}
