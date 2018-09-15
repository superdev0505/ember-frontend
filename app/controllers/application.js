import Ember from 'ember';
import config from '../config/environment';

export default Ember.Controller.extend({

  cableService: Ember.inject.service('cable'),

  pushbots: Ember.inject.service(),

  updatesSubscription: null,


  // On login, subscribe the user to a websocket for live updates
  // Change this when the user changes
  // This handles data as follows:
  //  Any model sent to this channel should be loaded, or reloaded if already loaded and has been updated
  //  Alert counts should be updated appropriately
  setupUpdatesChannel: Ember.on('init', function(){
    var _this = this;
    if(this.get('updatesSubscription.subscription')){
      console.log("Not setting up subscription as already exists");
      return false;

    }
    var user_id = this.get('session.data.authenticated.user_id');
    if(user_id){

      console.log("SUBSCRIBING TO UPDATES CHANNEL");
      // Setup websocket to the server
      // Connect to the Conversation channel
      _this.get('session').authorize('authorizer:devise', function(headerName, headerValue) {

        // Skip in test mode
        if(config.APP.environment === 'test'){ return false; }

        // Extract the actual token from the headerValue
        var token = headerValue.split(",")[0];
        token = token.substr(13);
        token = token.substr(0, token.length - 1);

        var consumer = _this.get('cableService').createConsumer(_this.get('cableUrl') + "?user_email="+_this.get('session.data.authenticated.user_email')+"&token=" + token);

        const updatesSubscription = consumer.subscriptions.create({channel: "UpdatesChannel"}, {
          connected() {
            // Call the 'subscribed' method -> streams conversation
            // console.log("Calling subscribe method")
            this.perform('subscribed');
          },
          received(data) {
            console.log("Received websocket update");
            console.log(data);

            // Update alert counts
            if(data.alertCounts){
              _this.get('unreadAlerts').set('all', data.alertCounts.all);
              _this.get('unreadAlerts').set('messages', data.alertCounts.messages);
              _this.get('pushbots').setBadge(data.alertCounts.all);
            }

            // loadModels is an array of serialized models
            // If loadModels are sent load them with pushPayload
            // Ember is clever enough to create or update as appropriate
            if(data.loadModels){
              data.loadModels.forEach(function(x){
                _this.store.pushPayload(x);
              });
            }

            // destroyModels is an array of [modelName, modelId] pairs
            // Delete them from the local store
            if(data.destroyModels){
              data.destroyModels.forEach(function(x){
                var record = _this.store.peekRecord(x.modelName, x.id);
                if(record){
                  _this.store.deleteRecord(record);
                }
              });
            }


          },
          disconnected() {
            Ember.debug("UpdatesChannel#disconnected");
          }
        });
        _this.set('updatesSubscription.subscription', updatesSubscription);


      });
    }
  }).observes('session.data.authenticated.user_id'),




  //
  // setupConsumer: Ember.on('init', function() {
  //   var consumer = this.get('cableService').createConsumer('ws://localhost:3000/cable');
  //
  //   consumer.subscriptions.create("NotificationChannel", {
  //     connected() {
  //       this.perform('hello', { foo: 'bar' });
  //       this.perform('hello');
  //     },
  //     received(data) {
  //       Ember.debug( "received(data) -> " + Ember.inspect(data) );
  //     },
  //     disconnected() {
  //       Ember.debug("NotificationChannel#disconnected");
  //     }
  //   });
  //
  //   // Passing Parameters to Channel
  //   const subscription = consumer.subscriptions.create({ channel: 'NotificationChannel', room: 'Best Room' }, {
  //     received: (data) => {
  //       this.updateRecord(data);
  //     }
  //   });
  //
  //   // Send actions to your Action Cable channel class
  //   subscription.perform("your_channel_action", { hey: "hello" });
  // }),
  //
  // updateRecord(data) {
  //   Ember.debug( "updateRecord(data) -> " + Ember.inspect(data) );
  // }

});
