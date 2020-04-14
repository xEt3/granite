import classic from 'ember-classic-decorator';
import Component from '@ember/component';

@classic
class BaseLiComponent extends Component {}

BaseLiComponent.reopenClass({ positionalParams: [ 'model' ] });

export default BaseLiComponent;
