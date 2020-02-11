import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

const defaultList = [{
  name:   'Verbal Warning',
  formal: false
}, {
  name:   'Written Warning',
  formal: true
}, {
  name:   'Termination',
  formal: true
}];

export default Factory.extend({
  name (i) {
    let def = defaultList[i];
    return def && def.name || faker.random.word();
  },
  order: (i) => i + 1,
  formal (i) {
    let def = defaultList[i] || {};
    return !!def.formal;
  }
});
