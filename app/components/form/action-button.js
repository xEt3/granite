import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  classNameBindings: [ 'loading' ],
  attributeBindings: [ 'type', 'loading:disabled' ]
});
