import Ember from 'ember';

const { Mixin, computed } = Ember;

export default Mixin.create({
  limit: 10,
  __totalItems: computed.reads('content.meta.totalRecords'),

  pages: computed('__totalItems', 'limit', function () {
    let total = this.get('__totalItems') || 0;
    return Math.ceil(total / this.get('limit'));
  })
});
