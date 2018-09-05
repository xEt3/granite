import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  init() {
    this.name = {
      first: 'Jack',
      last: 'Homer'
    };
  },
  id: 17
});
