import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  limit:                10,
  __totalItems:         computed.reads('model.meta.totalRecords'),
  __metadataTotalItems: computed.reads('metadata.totalRecords'),

  pages: computed('__totalItems', '__metadataTotalItems', 'limit', function () {
    console.warn('Using the pagination mixin is no longer valid. Change arguments used in x-pagination component.');
    let total = this.get('__totalItems') || this.get('__metadataTotalItems') || 0;
    return Math.ceil(total / this.get('limit'));
  })
});
