import classic from 'ember-classic-decorator';
import { computed } from '@ember/object';
import { on } from '@ember-decorators/object';
/* eslint-disable ember/closure-actions,ember/no-on-calls-in-components */
// From https://github.com/thefrontside/ember-introjs since CLI install is broken
import Component from '@ember/component';
import { run, bind } from '@ember/runloop';
import { camelize, underscore } from '@ember/string';
import { A } from '@ember/array';
import ENV from 'granite/config/environment';

const introJS = window.introJs;

var INTRO_JS_OPTIONS = [
  'next-label',
  'prev-label',
  'skip-label',
  'done-label',
  'tooltip-position',
  'tooltip-class',
  'highlightClass',
  'exit-on-esc',
  'exit-on-overlay-click',
  'show-step-numbers',
  'show-step-numbers',
  'keyboard-navigation',
  'show-buttons',
  'show-bullets',
  'show-progress',
  'scroll-to-element',
  'overlay-opacity',
  'disable-interaction'
];

@classic
class IntroJSComponent extends Component {
  didInsertElement() {
    run.scheduleOnce('afterRender', this, this.startIntroJS);
  }

  didUpdateAttrs() {
    if (this['start-if'] !== this.shouldStart) {
      this.shouldStart = this['start-if'];
      run.scheduleOnce('afterRender', this, this.startIntroJS);
    }
  }

  /**
   * Options passed to IntroJS. You can specify the options when using the
   * Handlebars helper:
   *
   * ```handlebars
   * {{intro-js steps=steps show-bullets=true}}
   * ```
   *
   * Or you could extend your own base class to override defaults
   * instead of specifying them every time in the Handlebars helper:
   *
   * ```javascript
   * myapp/app/components/my-intro-js.js
   *
   * import IntroJSComponent from 'ember-introjs/components/intro-js';
   *
   * export default IntroJSComponent.extend({
   *   'exit-on-esc': true
   * });
   * ```
   *
   * You can also reopen the class:
   *
   * ```javascript
   * import IntroJSComponent from 'ember-introjs/components/intro-js';
   *
   * IntroJSComponent.reopen({
   *   'exit-on-esc': true
   * });
   * ```
   *
   * @property
  */
  @computed(
    'next-label',
    'prev-label',
    'skip-label',
    'done-label',
    'tooltip-position',
    'tooltip-class',
    'highlightClass',
    'exit-on-esc',
    'exit-on-overlay-click',
    'show-step-numbers',
    'keyboard-navigation',
    'show-buttons',
    'show-bullets',
    'show-progress',
    'scroll-to-element',
    'overlay-opacity',
    'disable-interaction',
    'steps'
  )
  get introJSOptions() {
    var option, normalizedName, value, options = {};

    for (var i = 0; i < INTRO_JS_OPTIONS.length; i++) {
      option = INTRO_JS_OPTIONS[i];
      normalizedName = camelize(underscore(option));
      value = this.get(option);

      if (value !== null && value !== undefined) {
        options[normalizedName] = value;
      }
    }

    options.steps = this.steps;
    return options;
  }

  startIntroJS() {
    if (ENV.environment === 'test') {
      return;
    }

    var intro,
        options = this.introJSOptions;

    if (!this.introJS) {
      this._setIntroJS(introJS());
    }

    intro = this.introJS;

    if (this['start-if']) {
      intro.setOptions(options);
      this.registerCallbacksWithIntroJS();
      this._setCurrentStep(0);

      intro.start();
    } else {
      intro.exit();
      this._setIntroJS(null);
    }
  }

  registerCallbacksWithIntroJS() {
    var intro = this.introJS;

    intro.onbeforechange(bind(this, function (elementOfNewStep) {
      var prevStep = this.currentStep;
      this._setCurrentStep(this.get('introJS._currentStep'));
      var nextStep = this.currentStep;

      this.sendAction('on-before-change', prevStep, nextStep, this, elementOfNewStep);
    }));

    intro.onchange(bind(this, function (targetElement) {
      this.sendAction('on-change', this.currentStep, this, targetElement);
    }));

    intro.onafterchange(bind(this, this._onAfterChange));

    intro.oncomplete(bind(this, function () {
      this.sendAction('on-complete', this.currentStep);
    }));

    intro.onexit(bind(this, this._onExit));
  }

  _setIntroJS(intJS) {
    this.set('introJS', intJS);
  }

  _onAfterChange(targetElement) {
    this.sendAction('on-after-change', this.currentStep, this, targetElement);
  }

  _onExit() {
    if (!this || this.isDestroying || this.isDestroyed) {
      return;
    }
    this.sendAction('on-exit', this.currentStep, this);
  }

  @on('willDestroyElement')
  exitIntroJS() {
    var intro = this.introJS;
    if (intro) {
      intro.exit();
    }
  }

  _setCurrentStep(step) {
    var stepObject = A(this.steps).objectAt(step);
    this.set('currentStep', stepObject);
  }
}

export default IntroJSComponent;
