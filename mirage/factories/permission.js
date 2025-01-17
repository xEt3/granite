import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

const cats = [ 'create', 'read', 'update', 'delete' ];

export default Factory.extend({
  created: new Date(),
  key (i) {
    let verb = i > 3 ? faker.hacker.verb() : cats[i];
    return `${verb} ${faker.commerce.product()}`;
  }
});
