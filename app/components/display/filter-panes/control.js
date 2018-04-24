import Component from '@ember/component';

const ControlComponent = Component.extend({
  classNames: [ 'ui', 'field' ],

  __update (context, val) {
    context.get('update')(context.get('controlName'), val);
  }
});

ControlComponent.reopenClass({
  positionalParams: [ 'controlName' ]
})

export default ControlComponent;
