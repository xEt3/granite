import classic from 'ember-classic-decorator';
import LocalForageAdapter from 'ember-localforage-adapter/adapters/localforage';

@classic
export default class Session extends LocalForageAdapter {
  namespace = 'granite-grants';
}
