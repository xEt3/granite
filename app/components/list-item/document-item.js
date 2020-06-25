import Component from '@glimmer/component';
import { match } from '@ember/object/computed';

export default class ListItemDocumentItemComponent extends Component {
  @match('args.model.extension', /jpe?g|png|gif/i) imagePreview
}

/*
  USAGE
  <ListItem::DocumentItem
    @model={{this.file}}
    @deleteAction={{this.removeDocument}}
    @confirmDeleteContent="Are you sure you want to remove this document?"
  />
*/
