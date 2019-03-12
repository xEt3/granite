import BaseLiComponent from './base';
import { inject as service } from '@ember/service';

export default BaseLiComponent.extend({
  auth:       service(),
  classNames: [ 'item' ]
});
