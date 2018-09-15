import { module } from 'qunit';
import { resolve } from 'rsvp';
import startApp from '../helpers/start-app';
import destroyApp from '../helpers/destroy-app';
import { getOwner } from '@ember/application';

export default function(name, options = {}) {
  module(name, {
    beforeEach() {
      this.application = startApp();

      // don't run clock service in acceptance test
      // const clockService = getOwner(this.application).lookup('service:clock');
      // if (clockService) { clockService.stop(); }
      //
      // if (options.beforeEach) {
      //   return options.beforeEach.apply(this, arguments);
      // }
    },

    afterEach() {
      let afterEach = options.afterEach && options.afterEach.apply(this, arguments);
      return resolve(afterEach).then(() => destroyApp(this.application));
    }
  });
}
