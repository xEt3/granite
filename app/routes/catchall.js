import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class CatchallRoute extends Route {
  titleToken = 'Error';
}
