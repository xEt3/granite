import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  headData:   service(),
  titleToken: 'Contact',

  afterModel () {
    this.set('headData.description', 'Questions or feedback for us? Get in touch. Granite HR is a lightweight HRIS that helps you conquer human resources.');
  }
});
