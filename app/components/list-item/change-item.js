import BaseLiComponent from './base';

export default BaseLiComponent.extend({
  classNames: [ 'item', 'clearfix' ],

  /* stubs */
  onApprove: () => {},
  onReject: () => {}
});