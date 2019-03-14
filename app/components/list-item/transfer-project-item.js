import Component from '@ember/component';

let TransferProjectItem = Component.extend({ classNames: [ 'item' ] });

TransferProjectItem.reopenClass({ positionalParams: [ 'project' ] });

export default TransferProjectItem;
