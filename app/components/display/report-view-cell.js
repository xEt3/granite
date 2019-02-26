import Component from '@ember/component';

const reportViewCell = Component.extend({ tagName: 'td' });

reportViewCell.reopenClass({ positionalParams: [ 'cellData' ] });

export default reportViewCell;
