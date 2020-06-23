import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: [ 'correctiveActionSeverities', 'labels' ],
  embed:   true,

  keyForAttribute (attr) {
    return attr;
  }
});
