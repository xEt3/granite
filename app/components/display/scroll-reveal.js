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

const ScrollRevealComponent = Component.extend({
  reset: true,
  duration: 1000,

  init () {
    if (!window.sr) {
      window.sr = ScrollReveal();
    }

    this.set('_sr', window.sr);

    if (!this.get('hasBlock') && this.get('selector')) {
      this.tagName = '';
    }

    this._super(...arguments);
  },

  didInsertElement () {
    this.initializeReveal();
  },

  initializeReveal () {
    const componentOpts = this.getProperties(sroptlist);

    const opts = Object.keys(componentOpts).reduce((optsObj, key) => {
      if (componentOpts[key] !== undefined) {
        optsObj[key] = componentOpts[key];
      }

      return optsObj;
    }, {});

    this.get('_sr').reveal(
      this.get('selector') || this.$().children().first()[0] || this.$(),
      opts
    );
  }
});

ScrollRevealComponent.reopenClass({
  positionalParams: [ 'selector' ]
});

export default ScrollRevealComponent;
