import Ember from 'ember';

const { Mixin, computed } = Ember;

export default Mixin.create({
  limit: 10,
  __totalItems: computed.reads('content.meta.totalRecords'),

  pages: computed('__totalItems', 'target.limit', function () {
    return Math.ceil(this.get('__totalItems') || 0 / this.get('limit'));
  })
});
