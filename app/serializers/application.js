import classic from 'ember-classic-decorator';
import RESTSerializer from 'ember-data/serializers/rest';

@classic
export default class Application extends RESTSerializer {
  normalize(modelClass, hash) {
    if (!hash.id && hash._id) {
      hash.id = hash._id;
    }

    delete hash._id;
    delete hash.__v;

    return super.normalize(...arguments);
  }
}
