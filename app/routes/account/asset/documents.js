import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class DocumentsRoute extends Route {
  titleToken = 'Documents';
}
