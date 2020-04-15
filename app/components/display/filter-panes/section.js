import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('ui', 'vertical', 'segment')
@classNameBindings('active::fade-unless-hovered')
class SectionComponent extends Component {
  toggleActive() {
    this.toggleProperty('active');

    const activeState = Object.assign({}, this.activeState),
          active = this.active,
          resets = this.resets;

    if (active && activeState) {
      for (let controlName in activeState) {
        if (!Object.prototype.hasOwnProperty.call(activeState, controlName)) {
          continue;
        }

        this.sendComponentUpdate(controlName, activeState[controlName]);
      }
    } else if (!active) {
      if (resets && resets.length > 0) {
        return resets.map(reset => this.resetFilter(reset));
      }

      if (this.get('childViews.length') > 1) {
        return this.childViews.map(view => this.resetFilter(view.get('controlName')));
      }

      this.resetFilter(resets || this.get('childViews.0.controlName') || (this.sectionName || '').toLowerCase());
    }
  }
}

SectionComponent.reopenClass({ positionalParams: [ 'sectionName' ] });

export default SectionComponent;
