/**
* environment.js
* Configuration file for app
*
* @module AppCore
*/
/* jshint node: true */
'use strict';

// TODO: when live, point staging and prod envirnoments to live server
var devapi = 'v2beta.oslr.co.uk';
var liveapi = 'v2beta.oslr.co.uk';

module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'oslr-ui',
    podModulePrefix: 'oslr-ui/pods',
    environment: environment,
    // baseURL: '/',
    rootURL: '',
    locationType: 'hash',

    contentSecurityPolicy: {
      'connect-src': "'self' ws://localhost:*"
    },

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      environment: environment,
      appVersion: "2.0.0.alpha1",

      // The app is organised into modules.
      // Define which are enabled here.
      // This can be overridden in particular environments, below.
      enabledModules: [
        "Users",
        "Alerts",
        "Directory",
        "Availabilities",
        "AvailabilitiesSignUp",
        "AvailabilitiesInvites",
        "AvailabilityRequests",
        "Messages",
        "Feedbacks",
        "Logbook",
        "Resources",
        "Help"
      ],

      // This is the beta app. Production should point to the real app.
      PUSHBOTS_KEY: "58df638f4a9efaa6898b456f",
      PUSHBOTS_ANDROID_KEY: "793863403254"
    },
    DS:{
      host: 'http://localhost:3000',
      cableHost: 'ws://localhost:3000/cable'
    },

    'ember-remodal': {
      disableAnimationWhileTesting: true
    }

  };

  // For local development
  if (environment === 'local') {
    ENV.DS.host = "http://localhost:3000";
    ENV.DS.cableHost = "ws://localhost:3000/cable";
    ENV.APP.isDev = true;
  }

  if (environment === "awstest") {
    ENV.DS.host = "http://development.p7vpzmymcx.eu-west-2.elasticbeanstalk.com";
    ENV.DS.cableHost = "ws://development.p7vpzmymcx.eu-west-2.elasticbeanstalk.com/cable";
    ENV.APP.isDev = true;
  }

  // For local development against the development API
  if (environment === 'localdevapi') {
    ENV.DS.host = "https://" + devapi;
    ENV.DS.cableHost = "wss://"+devapi+"/cable";
    ENV.APP.isDev = true;
  }

  // Testing environment - always uses local server
  if (environment === 'test') {
    // Force local server
    ENV.DS.host = 'http://localhost:3000';
    ENV.DS.cableHost = 'ws://localhost:3000/cable';

    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.autoboot = false;

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  // Dev environment - points to devapi.oslr.co.uk -> dummy database, NOT LIVE
  if (environment === 'development') {
    ENV.DS.host = "https://"+devapi;
    ENV.DS.cableHost = "wss://"+devapi+"/cable";
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.isDev = true;
  }

  // Staging - uses LIVE API, for dev version of Ember app
  if (environment === 'staging') {
    ENV.DS.host = "https://"+liveapi;
    ENV.DS.cableHost = "wss://"+liveapi+"/cable";

    // Override pushbots cofig with live data
    // TODO: change this
    // ENV.APP.PUSHBOTS_KEY = "58df638f4a9efaa6898b456f";
    // ENV.APP.PUSHBOTS_ANDROID_KEY = "793863403254";
  }

  // Production - live environment
  if (environment === 'production') {
    ENV.DS.host = "https://"+liveapi;
    ENV.DS.cableHost = "wss://"+liveapi+"/cable";

    // Override pushbots cofig with live data
    // TODO: change this
    ENV.APP.PUSHBOTS_KEY = "58df638f4a9efaa6898b456f";
    ENV.APP.PUSHBOTS_ANDROID_KEY = "793863403254";
  }

  return ENV;
};
