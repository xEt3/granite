import Component from '@ember/component';

const SettingsListsItem = Component.extend({ classNames: [ 'item' ] });

SettingsListsItem.reopenClass({ positionalParams: [ 'item', 'index' ] });

export default SettingsListsItem;
