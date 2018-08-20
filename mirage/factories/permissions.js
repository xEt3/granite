import { Factory, faker } from 'ember-cli-mirage';

const cats = [ 'create', 'read', 'update', 'delete' ];

export default Factory.extend({
  created: new Date(),
  id: i => i,
  key (i) {
    let verb = i > 3 ? faker.hacker.verb() : cats[i];
    return `${verb} ${faker.commerce.product()}`;
  }
});
