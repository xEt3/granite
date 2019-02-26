import Component from '@ember/component';

const reportViewRow = Component.extend({ tagName: 'tr' });

reportViewRow.reopenClass({ positionalParams: [ 'rowData', 'numColumns' ] });

export default reportViewRow;
