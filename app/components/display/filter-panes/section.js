// import { classNames, classNameBindings } from '@ember-decorators/component';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

// @classNames('ui', 'vertical', 'segment')
// @classNameBindings('active::fade-unless-hovered')
export default class DisplayFilterPanesSectionComponent extends Component {
  @tracked active

  @action
  toggleActive () {
    this.active = !this.active;

    const activeState = Object.assign({}, this.activeState),
          active = this.active,
          resets = this.resets;

    if (active && activeState) {
      for (let controlName in activeState) {
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
        return this.childViews.map(view => this.resetFilter(view.controlName));
      }

      this.resetFilter(resets || this.childViews[0].controlName || (this.sectionName || '').toLowerCase());
    }
  }
}

// SectionComponent.reopenClass({ positionalParams: [ 'sectionName' ] });

// export default SectionComponent;
