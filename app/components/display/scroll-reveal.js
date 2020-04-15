import classic from 'ember-classic-decorator';
import Component from '@ember/component';

const sroptlist = [
  'origin',
  'distance',
  'duration',
  'delay',
  'rotate',
  'opacity',
  'scale',
  'easing',
  'container',
  'mobile',
  'reset',
  'useDelay',
  'viewFactor',
  'viewOffset'
];

@classic
class ScrollRevealComponent extends Component {
  reset = true;
  duration = 1000;

  init() {
    if (!window.sr) {
      window.sr = ScrollReveal();
    }

    this.set('_sr', window.sr);

    if (!this.hasBlock && this.selector) {
      this.tagName = '';
    }

    super.init(...arguments);
  }

  didInsertElement() {
    this.initializeReveal();
  }

  initializeReveal() {
    const componentOpts = this.getProperties(sroptlist);

    const opts = Object.keys(componentOpts).reduce((optsObj, key) => {
      if (componentOpts[key] !== undefined) {
        optsObj[key] = componentOpts[key];
      }

      return optsObj;
    }, {});

    this._sr.reveal(
      this.selector || this.$().children().first()[0] || this.$(),
      opts
    );
  }
}

ScrollRevealComponent.reopenClass({ positionalParams: [ 'selector' ] });

export default ScrollRevealComponent;
