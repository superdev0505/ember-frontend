/*jshint node:true*/
/* global require, module */
/* eslint-env node */
'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let env = EmberApp.env();

	let isProduction = ['staging', 'production'].includes(env);
	let isLocalBuild = !isProduction;

  let app = new EmberApp(defaults, {
    // Add options here

    isProduction: isProduction,

    minifyJS: { enabled: isProduction },
    minifyCSS: { enabled: isProduction, options: { relativeTo: 'assets' }},

    fingerprint: {
      // exclude: ['fonts/169929'],
      enabled: isProduction,
      prepend: `https://s3-eu-west-1.amazonaws.com/oslr-${env}-app/`
    },

    // Disable jshint
    // 'esw-cache-first': {
    //   // RegExp patterns specifying which URLs to cache.
    //   patterns: [
    //     '(.+)',
    //     'https://s3-eu-west-1.amazonaws.com/oslr-beta-app/assets/fonts/(.+)',
    //     'https://s3-eu-west-1.amazonaws.com/oslr-beta-app/assets/images/(.+)'
    //   ],
    //
    //   // changing this version number will bust the cache
    //   version: '1'
    // }
    hinting: false,

    'ember-bootstrap': {
      'bootstrapVersion': 3,
      'importBootstrapFont': true,
      'importBootstrapCSS': true
    },

    // Configure some pages to cache-first e.g. home page, alerts
    // Other data should fallback to cache-fallback
    'esw-cache-first': {
      // RegExp patterns specifying which URLs to cache.
      patterns: [
        'http://localhost:3000/locations',
        'http://localhost:3000/job-titles',
        'http://localhost:3000/alerts(.+)',
        'http://localhost:3000/availabilities',
        'http://localhost:3000/availability-requests',
        'http://localhost:3000/user-locations(.+)'
        // 'http://localhost:3000/(.+)',
        // 'https://v2beta.oslr.co.uk/(.+)'
      ],
      version: '1'
    },
    'esw-cache-fallback': {
      // RegExp patterns specifying which URLs to cache.
      patterns: [
        'http://localhost:3000/(.+)'
      ],

      // changing this version number will bust the cache
      version: '1'
    }
  });

  app.import('bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js');
  app.import('bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css');

  // app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {
  //   destDir: 'fonts'
  // });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
