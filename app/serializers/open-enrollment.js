import ApplicationSerializer from './application';
import normalizeKeys from '../utils/serialize-object';

export default class OpenEnrollment extends ApplicationSerializer {
  normalize (modelClass, hash) {
    normalizeKeys(hash, true, 'start', 'end');
    const date = new Date();
    let year = date.getFullYear(),
        nextYear =  Number(hash.startMonth) > Number(hash.endMonth);

    hash.start = Date.parse(`${hash.startMonth}/${hash.startDay}/${date.getFullYear()}`);
    hash.end   = Date.parse(`${hash.endMonth}/${hash.endDay}/${nextYear ? year + 1 : year}`);
    return super.normalize(...arguments);
  }

  serialize () {
    let json  = super.serialize(...arguments),
        start = new Date(json.start),
        end   = new Date(json.end);

    json.start = {
      month: start.getMonth(),
      day:   start.getDate()
    };

    json.end = {
      month: end.getMonth(),
      day:   end.getDate()
    };

    return json;
  }
}
