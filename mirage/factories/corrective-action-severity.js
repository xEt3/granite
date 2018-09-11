import { Factory, faker } from 'ember-cli-mirage';
import { computed } from '@ember/object';

export default Factory.extend({
  name: faker.random.word(),
  order: (i) => i,
  formal: false,
  title: computed('name', 'order', function () {
    return `${this.get('name')} (${this.get('order')})`;
  })
});
