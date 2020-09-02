import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: [ 'elements' ],
  embed:   true,

  keyForAttribute (attr) {
    return attr;
  }
});
