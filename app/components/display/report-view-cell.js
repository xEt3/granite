import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('td')
class reportViewCell extends Component {}

reportViewCell.reopenClass({ positionalParams: [ 'cellData' ] });

export default reportViewCell;
