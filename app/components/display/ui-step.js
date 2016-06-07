import Ember from 'ember';

export default Ember.Component.extend({
  classNames: [ 'step' ],
  classNameBindings: [ 'step.completed:completed', 'step.active:active' ]
});
