import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('tr')
class reportViewRow extends Component {}

reportViewRow.reopenClass({ positionalParams: [ 'rowData', 'numColumns' ] });

export default reportViewRow;
