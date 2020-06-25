import Component from '@glimmer/component';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class DisplayFilterPanesSectionComponent extends Component {
  @tracked active
  @tracked childViews = A()

  @action
  registerControl (control) {
    if (control.state && !this.active) {
      this.active = true;
    }

    this.childViews.addObject(control);
  }

  @action
  unregisterControl (control) {
    this.childViews.removeObject(control);
  }

  @action
  toggleActive () {
    this.active = !this.active;

    const activeState = Object.assign({}, this.activeState),
          active = this.active,
          resets = this.resets;

    if (active && activeState) {
      for (var controlName in activeState) {
        if (!Object.prototype.hasOwnProperty.call(activeState, controlName)) {
          continue;
        }

        this.args.sendComponentUpdate(controlName, activeState[controlName]);
      }
    } else if (!active) {
      if (resets && resets.length > 0) {
        return resets.map(reset => this.args.resetFilter(reset));
      }

      if (this.childViews.length > 1) {
        return this.childViews.map(view => this.resetFilter(view.name));
      }

      this.args.resetFilter(resets || this.childViews[0].name || (this.args.name || '').toLowerCase());
    }
  }
}
