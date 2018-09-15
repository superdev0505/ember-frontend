/**
* Service to set up a Pushbots service.
*
* * Initialises pushbots when the application starts
* * Handles receipt of notifications
* * Provides methods to register a user with pushbots, which are called on login
*
* @module Alerts
*/
import Ember from 'ember';
import config from '../../config/environment';

export default Ember.Service.extend({

  init: function(){
    this._super(...arguments);
    if(!window.cordova){ return false; }
    document.addEventListener('deviceready', function () {
      console.log("INITIALISING PUSHBOTS");
      window.plugins.PushbotsPlugin.initialize(
        config.APP.PUSHBOTS_KEY, {
          "android":{"sender_id":"GOOGLE_SENDER_ID"}
        }
      );

      // Should be called once app receive the notification only while the application is open or in background
      window.plugins.PushbotsPlugin.on("notification:received", function(data){
      	console.log("received:" + JSON.stringify(data));

      	//Silent notifications Only [iOS only]
      	//Send CompletionHandler signal with PushBots notification Id
      	window.plugins.PushbotsPlugin.done(data.pb_n_id);
      });
    });

    // Should be called once the notification is clicked
    window.plugins.PushbotsPlugin.on("notification:clicked", function(data){
        console.log("clicked:" + JSON.stringify(data));
    });

    // Should be called once the device is registered successfully with Apple or Google servers
    window.plugins.PushbotsPlugin.on("registered", function(token){
        console.log(token);
    });
  },

  tagUser(user){
    if(!window.cordova){ return false; }
    //Set user alias
    window.plugins.PushbotsPlugin.setAlias(user.get('email'));
  },

  setBadge(val){
    if(!window.cordova){ return false; }
    if(val === 0){
      //Reset Badge
      window.plugins.PushbotsPlugin.resetBadge();
    }else{
      //Set badge
      window.plugins.PushbotsPlugin.setBadge(val);
    }
  }



});
