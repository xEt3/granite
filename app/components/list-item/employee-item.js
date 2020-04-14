import classic from 'ember-classic-decorator';
import { tagName } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@tagName('')
class EmployeeItemComponent extends Component {}

EmployeeItemComponent.reopenClass({ positionalParams: [ 'employee' ] });

export default EmployeeItemComponent;
