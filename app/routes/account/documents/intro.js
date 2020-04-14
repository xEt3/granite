import classic from 'ember-classic-decorator';
import Route from '@ember/routing/route';

@classic
export default class IntroRoute extends Route {
  titleToken = 'Intro to Documents';
}
