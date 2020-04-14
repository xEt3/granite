import classic from 'ember-classic-decorator';
import { classNames } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('item')
class SettingsListsItem extends Component {}

SettingsListsItem.reopenClass({ positionalParams: [ 'item', 'index' ] });

export default SettingsListsItem;
