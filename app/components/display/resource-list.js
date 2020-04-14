import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import Component from '@ember/component';
import Inflector from 'ember-inflector';

let inflect = new Inflector(Inflector.defaultRules);

@classic
class ResourceListComponent extends Component {
  modelIdentifier = 'id';

  // resourceName works off of an AdapterPopulatedRecordArray
  // and the type property that returns the query's model
  @computed('model.type')
  get resourceName() {
    let type = this.get('model.type.modelName');
    return type ? inflect.pluralize(type) : 'items';
  }
}

ResourceListComponent.reopenClass({ positionalParams: [ 'model', 'itemComponent' ] });

export default ResourceListComponent;
