import BaseLiComponent from '../base';
import { computed } from '@ember/object';

export default BaseLiComponent.extend({
  classNames: [ 'item', 'action-item__checklist--item' ],

  slug: computed('model.title', function () {
    let title = this.get('model.title');
    return title ? title.replace(/\s/g, '-') : title;
  })
});
