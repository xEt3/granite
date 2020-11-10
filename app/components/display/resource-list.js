import Component from '@glimmer/component';
import Inflector from 'ember-inflector';

let inflect = new Inflector(Inflector.defaultRules);

export default class DisplayResourceListComponent extends Component {
  modelIdentifier = 'id';

  // resourceName works off of an AdapterPopulatedRecordArray
  // and the type property that returns the query's model
  get resourceName () {
    let type = this.args.modelName || this.args.model.type.modelName;
    return type ? inflect.pluralize(type) : 'items';
  }
}

/*
  USAGE:
  <Display::ResourceList
    @model={{this.model}}
    @itemComponent="list-item/document-item"
    @linkTo="account.document"
    @linkClass="item"
    class="ui divided link items"/>

*/
