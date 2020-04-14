import classic from 'ember-classic-decorator';
import ApplicationSerializer from './application';

@classic
export default class Label extends ApplicationSerializer {
  serialize() {
    let json = super.serialize(...arguments);
    json._id = json.id;
    return json;
  }
}
