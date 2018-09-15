/**
* The AppCore module describes fundamental files without which the app wouldn't work at all.
*
* @module AppCore
* @class app.js
* @main AppCore
**/
import Application from '@ember/application';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
