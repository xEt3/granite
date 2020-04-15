import classic from 'ember-classic-decorator';
import { inject as service } from '@ember/service';
import Route from '@ember/routing/route';

@classic
export default class ContactRoute extends Route {
  @service
  headData;

  titleToken = 'Contact';

  afterModel () {
    this.set('headData.description', 'Questions or feedback for us? Get in touch. Granite HR is a lightweight HRIS that helps you conquer human resources.');
  }
}
