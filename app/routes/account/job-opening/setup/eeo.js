import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class EeoRoute extends Route {
  titleToken = 'EEO';
}
