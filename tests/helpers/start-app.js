import { run } from '@ember/runloop';
import { merge } from '@ember/polyfills';
import Application from '../../app';
import config from '../../config/environment';
import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';

registerPowerSelectHelpers();

import signIn from './sign-in';
import signInMain from './sign-in-main';

export default function startApp(attrs) {
  let attributes = merge({}, config.APP);
  attributes.autoboot = false;
  attributes = merge(attributes, attrs); // use defaults, but you can override;

  return run(() => {
    let application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
    return application;
  });
}
