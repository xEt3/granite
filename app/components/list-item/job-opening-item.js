import BaseLiComponent from './base';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default BaseLiComponent.extend({
  auth:       service(),
  classNames: [ 'content' ],

  quartzLink: computed('model.title', function () {
    if (this.model) {
      let title = this.model.title + '';
      return (title.match(/\s/) ? title.replace(/\s/, '-') : title)  + '_' +  this.model.id;
    }
  }),

  companyPrefix: computed.reads('auth.user.company.urlPrefix')
});
