import Component from '@ember/component';
import { computed } from '@ember/object';

const DocumentItemComponent = Component.extend({
  classNames:   [ 'item' ],
  tagName:      '',
  imagePreview: computed.match('file.extension', /je?pg|png|gif/i)
});

DocumentItemComponent.reopenClass({ positionalParams: [ 'file' ] });

export default DocumentItemComponent;
