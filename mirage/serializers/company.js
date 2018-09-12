import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  include: ['correctiveActionSeverities'],
  embed: true
});
