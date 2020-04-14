import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('step')
@classNameBindings('step.completed:completed', 'step.active:active')
export default class UiStep extends Component {}
