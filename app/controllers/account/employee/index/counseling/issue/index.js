import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import resource from 'granite/mixins/controller-abstractions/resource';

export default Controller.extend(resource, {
  auth: service()
});
