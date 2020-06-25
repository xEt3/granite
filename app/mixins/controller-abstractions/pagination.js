import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';

export default Mixin.create({
  limit:                10,
  __totalItems:         computed.reads('model.meta.totalRecords'),
  __metadataTotalItems: computed.reads('metadata.totalRecords'),

  pages: computed('__totalItems', '__metadataTotalItems', 'limit', function () {
    console.warn('Using the pagination mixin is no longer valid. Change arguments used in x-pagination component.'); // eslint-disable-line
    let total = this.__totalItems || this.__metadataTotalItems || 0;
    return Math.ceil(total / this.limit);
  })
});
