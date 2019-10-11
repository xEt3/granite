export function initialize (application) {
  application.inject('route', 'analytics', 'service:analytics');
  application.inject('controller', 'analytics', 'service:analytics');
}

export default {
  name: 'analytics',
  initialize
};
