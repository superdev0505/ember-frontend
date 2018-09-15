export function initialize(application) {
  application.inject('controller', 'phoenix', 'service:phoenix');
};
export default {
  name: 'socket',
  initialize: initialize
};
