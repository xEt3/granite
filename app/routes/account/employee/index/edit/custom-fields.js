import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CustomFieldsRoute extends Route {
  titleToken = 'Edit Custom Fields';
}
