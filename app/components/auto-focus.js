import Component from '@glimmer/component';
import { elementId } from 'granite/core';
import { action } from '@ember/object';
import { run } from '@ember/runloop';

@elementId
export default class AutoFocusComponent extends Component {
  get autoFocusId () {
    return 'auto-focus__' + this.elementId;
  }

  @action
  didInsert () {
    console.log('??', document.querySelector(`#${this.autoFocusId} input`));
    run.scheduleOnce('afterRender', () => document.querySelector(`#${this.autoFocusId} input`).focus());
  }
}
