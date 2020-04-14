import classic from 'ember-classic-decorator';
import LocalForageSerializer from 'ember-localforage-adapter/serializers/localforage';

@classic
export default class Session extends LocalForageSerializer {}
