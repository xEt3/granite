import Component from '@ember/component';

let BaseLiComponent = Component.extend({});

BaseLiComponent.reopenClass({ positionalParams: [ 'model' ] });

export default BaseLiComponent;
