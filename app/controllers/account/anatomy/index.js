import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Controller from '@ember/controller';

@classic
export default class IndexController extends Controller {
  init () {
    super.init(...arguments);
    this.set('selectedNode', this.get('model.firstObject'));
  }

  @computed('model', 'selectedNode.id')
  get baseNode () {
    return this.makeNode(this.selectedNode || this.get('model.firstObject'));
  }

  makeNode (object, base = {}) {
    if (!object) {
      return;
    }

    return Object.assign({}, base, {
      _id:  object.get('id'),
      name: {
        first: object.get('firstName'),
        last:  object.get('lastName')
      },
      email:      object.get('email'),
      supervisor: object.belongsTo('supervisor').id()
    });
  }
}
