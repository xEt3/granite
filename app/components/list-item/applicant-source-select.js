import BaseLiComponent from './base';

export default BaseLiComponent.extend({
  classNames:        [ 'applicant-source__list-item', 'item' ],
  classNameBindings: [ 'selected:applicant-source__list-item--selected' ],

  sendUpdate () {
    this.get('onUpdate')(this.get('model'));
  },

  click () {
    this.sendUpdate();
  }
});
