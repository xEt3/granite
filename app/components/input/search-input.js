import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { throttle, cancel } from '@ember/runloop';
import { action } from '@ember/object';

export default class SearchInputComponent extends Component {
  throttleMs = 1500
  @tracked termDesync = false
  @tracked preflightTerm = null

  cancelTimer () {
    if (this.throttleId) {
      cancel(this.throttleId);
    }
  }

  resetOrSetTimer () {
    console.log(this.args.throttleMs || this.throttleMs);
    this.throttleId = throttle(this, this.postToSubmitHandler, this.args.throttleMs || this.throttleMs, false);
  }

  postToSubmitHandler () {
    console.log('heller?');
    this.args.onSubmit(this.preflightTerm);
    this.termDesync = false;
  }

  @action
  updatePreflightTerm (e) {
    console.log('hur');
    this.termDesync = true;
    this.preflightTerm = e.target.value;
    this.resetOrSetTimer();
  }

  @action
  submit () {
    this.cancelTimer();
    this.postToSubmitHandler();
  }
}
