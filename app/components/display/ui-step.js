import Component from '@ember/component';

export default Component.extend({
  classNames:        [ 'step' ],
  classNameBindings: [ 'step.completed:completed', 'step.active:active' ]
});
