import BaseLiComponent from './base';
import { computed } from '@ember/object';


export default BaseLiComponent.extend({
  classNames: [ 'content' ],

  quartzLink: computed('model.title', function () {
    let title = this.model.title + '';
    return title.match(/\s/) ? title.replace(/\s/, '-') + '_' +  this.model.id : title + '_' +  this.model.id;
  })
});
