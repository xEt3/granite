import classic from 'ember-classic-decorator';
import { classNames, classNameBindings } from '@ember-decorators/component';
import Component from '@ember/component';

@classic
@classNames('ui', 'vertical', 'segment')
@classNameBindings('active::fade-unless-hovered')
class SectionComponent extends Component {
  toggleActive() {
    this.toggleProperty('active');

    const activeState = Object.assign({}, this.get('activeState')),
          active = this.get('active'),
          resets = this.get('resets');

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
        return this.get('childViews').map(view => this.resetFilter(view.get('controlName')));
      }

      this.resetFilter(resets || this.get('childViews.0.controlName') || (this.get('sectionName') || '').toLowerCase());
    }
  }
}

SectionComponent.reopenClass({ positionalParams: [ 'sectionName' ] });

export default SectionComponent;
