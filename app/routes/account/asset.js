import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class AssetRoute extends Route {
  titleToken () {
    return this.context.name;
  }

  model (params) {
    return this.store.find('asset', params.id);
  }
}
