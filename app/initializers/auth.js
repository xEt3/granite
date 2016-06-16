export function initialize ( application ) {
  application.inject('route', 'auth', 'service:auth');
  application.inject('controller', 'auth', 'service:auth');
}

export default {
  name: 'auth',
  initialize
};
